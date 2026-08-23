import { AccessToken } from "livekit-server-sdk";

const FIREBASE_DATABASE_URL =
  "https://chatapp-d8a5b-default-rtdb.europe-west1.firebasedatabase.app";
const SESSION_COOKIE = "chatapp_session";
const SESSION_SECONDS = 12 * 60 * 60;
const CALL_TOKEN_SECONDS = 10 * 60;
const INVITE_SECONDS = 90;

export interface ChatAppEnv {
  LIVEKIT_URL?: string;
  LIVEKIT_API_KEY?: string;
  LIVEKIT_API_SECRET?: string;
  CHATAPP_SESSION_SECRET?: string;
}

interface LiveKitConfig {
  url: string;
  apiKey: string;
  apiSecret: string;
  sessionSecret: string;
}

interface Session {
  username: string;
  expiresAt: number;
}

interface CallInvite {
  v: 1;
  id: string;
  room: string;
  caller: string;
  callee: string;
  kind: "audio" | "video";
  expiresAt: number;
}

const encoder = new TextEncoder();

function base64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function textToBase64Url(value: string): string {
  return base64Url(encoder.encode(value));
}

function base64UrlToText(value: string): string {
  return new TextDecoder().decode(fromBase64Url(value));
}

function timingSafeEqual(left: string, right: string): boolean {
  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    diff |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return diff === 0;
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64Url(
    new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))),
  );
}

async function sha256(value: string): Promise<string> {
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(value)),
  );
  return Array.from(digest)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function configFrom(env: ChatAppEnv): LiveKitConfig | null {
  const url = env.LIVEKIT_URL || process.env.LIVEKIT_URL || "";
  const apiKey = env.LIVEKIT_API_KEY || process.env.LIVEKIT_API_KEY || "";
  const apiSecret =
    env.LIVEKIT_API_SECRET || process.env.LIVEKIT_API_SECRET || "";
  const sessionSecret =
    env.CHATAPP_SESSION_SECRET || process.env.CHATAPP_SESSION_SECRET || "";

  if (!url || !apiKey || !apiSecret || sessionSecret.length < 32) return null;
  return { url, apiKey, apiSecret, sessionSecret };
}

function json(
  data: Record<string, unknown>,
  status = 200,
  headers?: HeadersInit,
): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function error(message: string, status: number): Response {
  return json({ ok: false, error: message }, status);
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}

async function bodyAsObject(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    throw new Error("INVALID_CONTENT_TYPE");
  }
  const body = await request.json();
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("INVALID_BODY");
  }
  return body as Record<string, unknown>;
}

function normalizeUsername(value: unknown): string {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9çğıöşü_.]/g, "")
    .slice(0, 64);
}

async function fetchAccount(username: string): Promise<Record<string, unknown> | null> {
  const response = await fetch(
    `${FIREBASE_DATABASE_URL}/db/users/${encodeURIComponent(username)}.json`,
    {
      headers: { Accept: "application/json" },
      cf: { cacheTtl: 0 },
    } as RequestInit,
  );
  if (!response.ok) throw new Error("ACCOUNT_LOOKUP_FAILED");
  const account = await response.json();
  return account && typeof account === "object"
    ? (account as Record<string, unknown>)
    : null;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: Uint8Array.from(atob(salt), (char) => char.charCodeAt(0)),
      iterations: 210_000,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return bytesToBase64(new Uint8Array(bits));
}

async function passwordMatches(
  account: Record<string, unknown>,
  password: string,
): Promise<boolean> {
  if (
    typeof account.passHash === "string" &&
    typeof account.passSalt === "string"
  ) {
    const candidate = await hashPassword(password, account.passSalt);
    return timingSafeEqual(account.passHash, candidate);
  }
  return (
    typeof account.pass === "string" &&
    timingSafeEqual(account.pass, password)
  );
}

async function createSessionCookie(
  username: string,
  secret: string,
): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = `${textToBase64Url(username)}.${expiresAt}`;
  const signature = await hmac(payload, secret);
  return `${SESSION_COOKIE}=${payload}.${signature}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

async function readSession(
  request: Request,
  secret: string,
): Promise<Session | null> {
  const cookie = request.headers
    .get("Cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) return null;

  const value = cookie.slice(SESSION_COOKIE.length + 1);
  const [encodedUsername, expiryText, signature, ...rest] = value.split(".");
  if (rest.length || !encodedUsername || !expiryText || !signature) return null;

  const payload = `${encodedUsername}.${expiryText}`;
  const expected = await hmac(payload, secret);
  if (!timingSafeEqual(signature, expected)) return null;

  const expiresAt = Number(expiryText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() / 1000) {
    return null;
  }

  const username = normalizeUsername(base64UrlToText(encodedUsername));
  return username ? { username, expiresAt } : null;
}

async function roomNameForLobby(username: string): Promise<string> {
  return `lobby-${(await sha256(username)).slice(0, 32)}`;
}

async function participantIdentity(username: string, role: string): Promise<string> {
  return `${role}-${(await sha256(username)).slice(0, 24)}`;
}

async function createLiveKitToken(
  config: LiveKitConfig,
  room: string,
  username: string,
  role: string,
  grant: {
    canPublish: boolean;
    canSubscribe: boolean;
    canPublishData: boolean;
  },
): Promise<string> {
  const token = new AccessToken(config.apiKey, config.apiSecret, {
    identity: await participantIdentity(username, role),
    metadata: JSON.stringify({ username, role }),
    ttl: CALL_TOKEN_SECONDS,
  });
  token.addGrant({
    roomJoin: true,
    room,
    ...grant,
  });
  return token.toJwt();
}

async function signInvite(
  invite: CallInvite,
  secret: string,
): Promise<string> {
  const encoded = textToBase64Url(JSON.stringify(invite));
  return `${encoded}.${await hmac(encoded, secret)}`;
}

async function verifyInvite(
  token: unknown,
  secret: string,
): Promise<CallInvite | null> {
  if (typeof token !== "string" || token.length > 2048) return null;
  const [encoded, signature, ...rest] = token.split(".");
  if (rest.length || !encoded || !signature) return null;
  if (!timingSafeEqual(signature, await hmac(encoded, secret))) return null;

  try {
    const invite = JSON.parse(base64UrlToText(encoded)) as CallInvite;
    if (
      invite.v !== 1 ||
      !invite.id ||
      !invite.room ||
      !normalizeUsername(invite.caller) ||
      !normalizeUsername(invite.callee) ||
      !["audio", "video"].includes(invite.kind) ||
      !Number.isSafeInteger(invite.expiresAt) ||
      invite.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return invite;
  } catch {
    return null;
  }
}

async function requireSession(
  request: Request,
  config: LiveKitConfig,
): Promise<Session | Response> {
  const session = await readSession(request, config.sessionSecret);
  return session || error("Oturum süresi doldu. Yeniden giriş yap.", 401);
}

async function signalResponse(
  config: LiveKitConfig,
  target: string,
  sender: string,
  signal: Record<string, unknown>,
): Promise<Response> {
  const room = await roomNameForLobby(target);
  const token = await createLiveKitToken(
    config,
    room,
    `${sender}-${crypto.randomUUID()}`,
    "signal",
    { canPublish: false, canSubscribe: false, canPublishData: true },
  );
  return json({ ok: true, url: config.url, token, signal });
}

export async function handleChatAppApi(
  request: Request,
  env: ChatAppEnv,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/chatapp/")) return null;
  if (!isSameOrigin(request)) return error("Geçersiz istek kaynağı.", 403);

  const config = configFrom(env);
  if (!config) {
    return error("Arama hizmeti henüz yapılandırılmadı.", 503);
  }

  try {
    if (url.pathname === "/api/chatapp/session") {
      if (request.method === "DELETE") {
        return json(
          { ok: true },
          200,
          { "Set-Cookie": clearSessionCookie() },
        );
      }
      if (request.method === "GET") {
        const session = await readSession(request, config.sessionSecret);
        return session
          ? json({ ok: true, username: session.username })
          : error("Oturum bulunamadı.", 401);
      }
      if (request.method !== "POST") return error("Yönteme izin verilmiyor.", 405);

      const body = await bodyAsObject(request);
      const username = normalizeUsername(body.username);
      const password = typeof body.password === "string" ? body.password : "";
      if (!username || password.length < 4 || password.length > 256) {
        return error("Kullanıcı adı veya şifre geçersiz.", 400);
      }

      const account = await fetchAccount(username);
      if (
        !account ||
        account.removed === true ||
        !(await passwordMatches(account, password))
      ) {
        return error("Kullanıcı adı veya şifre hatalı.", 401);
      }

      return json(
        { ok: true, username },
        200,
        { "Set-Cookie": await createSessionCookie(username, config.sessionSecret) },
      );
    }

    const session = await requireSession(request, config);
    if (session instanceof Response) return session;
    if (request.method !== "POST") return error("Yönteme izin verilmiyor.", 405);

    if (url.pathname === "/api/chatapp/lobby") {
      const room = await roomNameForLobby(session.username);
      const token = await createLiveKitToken(
        config,
        room,
        session.username,
        "lobby",
        { canPublish: false, canSubscribe: true, canPublishData: false },
      );
      return json({ ok: true, url: config.url, token });
    }

    if (url.pathname === "/api/chatapp/calls/start") {
      const body = await bodyAsObject(request);
      const target = normalizeUsername(body.target);
      const kind = body.kind === "video" ? "video" : "audio";
      if (!target || target === session.username) {
        return error("Aranacak kişi geçersiz.", 400);
      }

      const account = await fetchAccount(target);
      if (!account || account.removed === true) {
        return error("Aranacak kişi bulunamadı.", 404);
      }

      const invite: CallInvite = {
        v: 1,
        id: crypto.randomUUID(),
        room: `call-${crypto.randomUUID()}`,
        caller: session.username,
        callee: target,
        kind,
        expiresAt: Math.floor(Date.now() / 1000) + INVITE_SECONDS,
      };
      const inviteToken = await signInvite(invite, config.sessionSecret);
      const callToken = await createLiveKitToken(
        config,
        invite.room,
        session.username,
        "call",
        { canPublish: true, canSubscribe: true, canPublishData: true },
      );
      const lobbyRoom = await roomNameForLobby(target);
      const lobbyToken = await createLiveKitToken(
        config,
        lobbyRoom,
        `${session.username}-${invite.id}`,
        "signal",
        { canPublish: false, canSubscribe: false, canPublishData: true },
      );

      return json({
        ok: true,
        url: config.url,
        callToken,
        lobbyToken,
        invite: inviteToken,
        signal: {
          type: "call-invite",
          invite: inviteToken,
          caller: session.username,
          kind,
          expiresAt: invite.expiresAt,
        },
      });
    }

    if (url.pathname === "/api/chatapp/calls/accept") {
      const body = await bodyAsObject(request);
      const invite = await verifyInvite(body.invite, config.sessionSecret);
      if (!invite || invite.callee !== session.username) {
        return error("Arama daveti geçersiz veya süresi dolmuş.", 403);
      }
      const callToken = await createLiveKitToken(
        config,
        invite.room,
        session.username,
        "call",
        { canPublish: true, canSubscribe: true, canPublishData: true },
      );
      return json({
        ok: true,
        url: config.url,
        callToken,
        kind: invite.kind,
        caller: invite.caller,
      });
    }

    if (
      url.pathname === "/api/chatapp/calls/decline" ||
      url.pathname === "/api/chatapp/calls/cancel"
    ) {
      const body = await bodyAsObject(request);
      const invite = await verifyInvite(body.invite, config.sessionSecret);
      const isDecline = url.pathname.endsWith("/decline");
      const validActor = isDecline
        ? invite?.callee === session.username
        : invite?.caller === session.username;
      if (!invite || !validActor) {
        return error("Arama daveti geçersiz veya süresi dolmuş.", 403);
      }
      return signalResponse(
        config,
        isDecline ? invite.caller : invite.callee,
        session.username,
        {
          type: isDecline ? "call-declined" : "call-cancelled",
          invite: body.invite,
          from: session.username,
        },
      );
    }

    return error("API yolu bulunamadı.", 404);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "";
    if (message === "INVALID_CONTENT_TYPE" || message === "INVALID_BODY") {
      return error("Geçersiz istek.", 400);
    }
    console.error("ChatApp API error", message);
    return error("Arama hizmetine şu anda ulaşılamıyor.", 502);
  }
}
