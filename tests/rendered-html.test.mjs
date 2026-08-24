import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/", requestInit = {}, extraEnv = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost/"), {
      headers: { accept: "text/html" },
      ...requestInit,
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
      ...extraEnv,
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function renderBundledChat() {
  const source = await readFile(
    new URL("../public/chat/index.html", import.meta.url),
    "utf8",
  );
  const scriptStart = source.indexOf("<script>", source.indexOf("<body>")) + 8;
  const scriptEnd = source.indexOf("</script>", scriptStart);
  const wrapper = source
    .slice(scriptStart, scriptEnd)
    .replace(
      "setStatus('Rendering...');",
      "globalThis.__renderedChat = pages[entryId]; return;",
    );
  const island = (type) => {
    const open = `<script type="${type}">`;
    const start = source.indexOf(open) + open.length;
    const end = source.indexOf("</script>", start);
    return { textContent: source.slice(start, end) };
  };

  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  let ready;
  globalThis.window = { addEventListener() {} };
  globalThis.document = {
    addEventListener(name, callback) {
      if (name === "DOMContentLoaded") ready = Promise.resolve().then(callback);
    },
    getElementById() {
      return { textContent: "" };
    },
    querySelector(selector) {
      if (selector.includes("__bundler/manifest")) return island("__bundler/manifest");
      if (selector.includes("__bundler/template")) return island("__bundler/template");
      if (selector.includes("__bundler/ext_resources")) return island("__bundler/ext_resources");
      return null;
    },
  };

  try {
    new Function(wrapper)();
    await ready;
    return globalThis.__renderedChat;
  } finally {
    globalThis.window = previousWindow;
    globalThis.document = previousDocument;
    delete globalThis.__renderedChat;
  }
}

test("server-renders the ChatApp product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /ChatApp ile konuşmalarını daha güvenli başlat\./i);
  assert.match(html, /href="\/chat\/index\.html"/i);
  assert.match(html, /ChatApp Pro/i);
  assert.match(html, /Ömer İlerisoy/i);
  assert.doesNotMatch(html, /Ece Yılmaz/i);
  assert.match(html, /href="#pro"/i);
  assert.match(html, /\/pro\/privacy\.png/i);
  assert.doesNotMatch(html, /3\s*€/i);
  assert.match(html, /<details class="plan-details">/i);
  assert.match(html, /Yakında sunulacak\./i);
  assert.match(
    html,
    /https:\/\/github\.com\/ilerisoyomer34-coder\/chatapp-pro/i,
  );
  assert.doesNotMatch(html, /Fiyat yakında açıklanacak/i);
  assert.doesNotMatch(html, /3\.00|priceCurrency|EUR/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("bundled chat app opens directly and deduplicates people", async () => {
  const source = await readFile(
    new URL("../public/chat/index.html", import.meta.url),
    "utf8",
  );

  assert.match(source, /view:'auth', authMode:'login'/);
  assert.match(source, /theme:'dark'/);
  assert.match(source, /const chatByPerson = new Map\(\)/);
  assert.match(source, /toLocaleLowerCase\('tr-TR'\)/);
  assert.match(source, /cx-auth-mock/);
  assert.match(source, /cx-message-feed/);
  assert.match(
    source,
    /Cannot read properties of null \(reading 'document'\)/,
  );
});

test("bundled chat app wires Pro privacy, calls, phone, GIF, and account hardening", async () => {
  const [html, proScript] = await Promise.all([
    renderBundledChat(),
    readFile(new URL("../public/chat/pro-suite.js", import.meta.url), "utf8"),
  ]);

  assert.match(html, /href="\/chat\/pro-suite\.css"/);
  assert.match(html, /src="\/chat\/livekit-client\.umd\.js"/);
  assert.match(html, /src="\/chat\/pro-suite\.js"/);
  assert.match(html, /title="ChatApp Pro"/);
  assert.match(html, /passwordRecord\(password\)/);
  assert.match(html, /passHash/);
  assert.match(html, /startAudioCall/);
  assert.match(html, /target:otherId/);
  assert.match(html, /ChatAppPro\.authenticate/);
  assert.match(html, /ChatAppPro\.resume/);
  assert.match(html, /ChatAppPro\.signOut/);
  assert.match(html, /chooseGif/);
  assert.match(html, /window\.ChatAppPro\.emojis\(\)/);
  assert.match(html, /messageExpiry\(\)/);
  assert.match(html, /Güvenli bağlantı/);
  assert.match(html, /aria-label="Ana uygulama menüsü"/);
  assert.match(html, />Sohbetler<\/span>/);
  assert.match(html, />Kişiler<\/span>/);
  assert.match(html, />Aramalar<\/span>/);
  assert.match(html, />Ayarlar<\/span>/);
  assert.match(html, /setAppTab\(tab\)/);
  assert.match(html, /openCalls:\(\) => this\.openPro\('phone'\)/);
  assert.match(html, /openSettings:\(\) => this\.openPro\('overview'\)/);
  assert.doesNotMatch(html, /Uçtan uca şifreli/i);

  assert.match(proScript, /AES-GCM/);
  assert.match(proScript, /Telefon ve Arama/);
  assert.doesNotMatch(proScript, /3\s*€/);
  assert.match(proScript, /Yakında sunulacak/);
  assert.match(proScript, /EMOJIS/);
  assert.match(proScript, /calls\/start/);
  assert.match(proScript, /calls\/accept/);
  assert.match(proScript, /RoomEvent\.TrackSubscribed/);
  assert.match(proScript, /setMicrophoneEnabled/);
  assert.match(proScript, /setCameraEnabled/);
  assert.match(proScript, /Aktarım sırasında şifreli/);
  assert.doesNotMatch(proScript, /LIVEKIT_API_(?:KEY|SECRET)/);
  assert.doesNotMatch(proScript, /Aramadan önce telefon/);

  const previousWindow = globalThis.window;
  globalThis.window = {};
  try {
    new Function(proScript)();
    assert.equal(window.ChatAppPro.normalizePhone("0555 123 45 67"), "+905551234567");
    assert.equal(window.ChatAppPro.normalizePhone("5551234567"), "+905551234567");
    assert.equal(window.ChatAppPro.normalizePhone("90 555 123 45 67"), "+905551234567");
    assert.equal(window.ChatAppPro.normalizePhone("+90 (555) 123-45-67"), "+905551234567");
    assert.equal(window.ChatAppPro.normalizePhone("123"), "");
  } finally {
    globalThis.window = previousWindow;
  }
});

test("call API rejects requests without a signed session", async () => {
  const env = {
    LIVEKIT_URL: "wss://example.livekit.cloud",
    LIVEKIT_API_KEY: "test-key",
    LIVEKIT_API_SECRET: "test-secret",
    CHATAPP_SESSION_SECRET: "s".repeat(48),
  };
  const response = await render(
    "/api/chatapp/lobby",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: "{}",
    },
    env,
  );

  assert.equal(response.status, 401);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), {
    ok: false,
    error: "Oturum süresi doldu. Yeniden giriş yap.",
  });
});

test("call API creates an HttpOnly session and a short-lived lobby token", async () => {
  const env = {
    LIVEKIT_URL: "wss://example.livekit.cloud",
    LIVEKIT_API_KEY: "test-key",
    LIVEKIT_API_SECRET: "k".repeat(40),
    CHATAPP_SESSION_SECRET: "s".repeat(48),
  };
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (request) => {
    const url = String(request instanceof Request ? request.url : request);
    if (url.includes("firebasedatabase.app/db/users/deniz.json")) {
      return Response.json({
        username: "deniz",
        name: "Deniz",
        pass: "correct-password",
      });
    }
    return previousFetch(request);
  };

  try {
    const sessionResponse = await render(
      "/api/chatapp/session",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          origin: "http://localhost",
        },
        body: JSON.stringify({
          username: "deniz",
          password: "correct-password",
        }),
      },
      env,
    );
    assert.equal(sessionResponse.status, 200);
    const cookie = sessionResponse.headers.get("set-cookie") ?? "";
    assert.match(cookie, /^chatapp_session=/);
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /Secure/i);
    assert.match(cookie, /SameSite=Strict/i);

    const lobbyResponse = await render(
      "/api/chatapp/lobby",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          cookie: cookie.split(";")[0],
          origin: "http://localhost",
        },
        body: "{}",
      },
      env,
    );
    assert.equal(lobbyResponse.status, 200);
    const lobby = await lobbyResponse.json();
    assert.equal(lobby.url, env.LIVEKIT_URL);
    assert.equal(typeof lobby.token, "string");
    assert.ok(lobby.token.length > 40);
    assert.doesNotMatch(JSON.stringify(lobby), new RegExp(env.LIVEKIT_API_SECRET));
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("call API rejects cross-origin requests", async () => {
  const response = await render("/api/chatapp/lobby", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      origin: "https://example.com",
    },
    body: "{}",
  });

  assert.equal(response.status, 403);
});

test("publishes crawl and sitemap instructions", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.txt", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: .*\/sitemap\.txt/);
  assert.match(sitemap, /ilerisoyomer\.ysfysfysf\.chatgpt\.site/);
});

test("serves Google verification without a redirect", async () => {
  const verificationFiles = [
    "google2405527c15d3ee60.html",
    "googleafcab923dcd0e885.html",
  ];

  for (const filename of verificationFiles) {
    const response = await render(`/${filename}`);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), `google-site-verification: ${filename}`);
  }
});
