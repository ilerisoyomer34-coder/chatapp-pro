(function () {
  "use strict";

  const DB_NAME = "chatapp-pro-vault";
  const DB_VERSION = 1;
  const PREF_PREFIX = "chatapp_pro_prefs_";
  const EMOJIS = (
    "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👻 💀 ☠️ 👽 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🙈 🙉 🙊 " +
    "💋 💌 💘 💝 💖 💗 💓 💞 💕 💟 ❣️ 💔 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 💯 💢 💥 💫 💦 💨 🕳️ 💣 💬 👁️‍🗨️ 🗨️ 🗯️ 💭 💤 " +
    "👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 👃 🧠 🫀 🫁 🦷 👀 👁️ 👅 👄 " +
    "👶 🧒 👦 👧 🧑 👱 👨 🧔 👩 🧓 👴 👵 🙍 🙎 🙅 🙆 💁 🙋 🧏 🙇 🤦 🤷 👮 👷 💂 🕵️ 👩‍⚕️ 👨‍🎓 👩‍🏫 👨‍⚖️ 👩‍🌾 👨‍🍳 👩‍🔧 👨‍🏭 👩‍💼 👨‍🔬 👩‍💻 👨‍🎤 👩‍🎨 👨‍✈️ 👩‍🚀 👨‍🚒 🥷 🦸 🦹 🧙 🧚 🧛 🧜 🧝 🧞 🧟 " +
    "💆 💇 🚶 🧍 🧎 🏃 💃 🕺 🕴️ 👯 🧖 🧗 🤺 🏇 ⛷️ 🏂 🏌️ 🏄 🚣 🏊 ⛹️ 🏋️ 🚴 🤸 🤼 🤽 🤾 🤹 🧘 🛀 🛌 👭 👫 👬 💏 💑 👪 🗣️ 👤 👥 🫂 " +
    "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🐤 🦄 🐝 🦋 🐌 🐞 🐢 🐍 🦎 🐙 🦑 🦀 🐠 🐟 🐬 🐳 🦈 🐊 🐅 🐆 🦓 🦍 🐘 🦏 🐪 🦒 🦘 🦬 🦥 🦦 🦨 🦩 🦚 🦜 " +
    "🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍂 🍁 🍄 🐚 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌜 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 🪐 ⭐ 🌟 ✨ ⚡ ☄️ 💥 🔥 🌪️ 🌈 ☀️ 🌤️ ⛅ 🌥️ ☁️ 🌦️ 🌧️ ⛈️ 🌩️ 🌨️ ❄️ ☃️ ⛄ 🌬️ 💧 ☔ 🌊 " +
    "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🍆 🥔 🥕 🌽 🌶️ 🫑 🥒 🥬 🥦 🧄 🧅 🍄 🥜 🌰 🍞 🥐 🥖 🥨 🥯 🥞 🧇 🧀 🍖 🍗 🥩 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🌯 🥙 🧆 🥚 🍳 🥘 🍲 🥣 🥗 🍿 🧈 🧂 🥫 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🥮 🍡 🥟 🥠 🥡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🥧 🍫 🍬 🍭 🍮 🍯 🍼 🥛 ☕ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊 " +
    "⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸️ 🥌 🎿 🎯 🪄 🎮 🕹️ 🎰 🎲 🧩 🧸 ♠️ ♥️ ♦️ ♣️ ♟️ 🃏 🀄 🎴 🎭 🖼️ 🎨 🧵 🪡 🎼 🎤 🎧 🎷 🪗 🎸 🎹 🎺 🎻 🥁 " +
    "🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🛵 🏍️ 🛺 🚲 🛴 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 🛩️ 💺 🚀 🛸 🚁 ⛵ 🚤 🛥️ 🛳️ ⛴️ 🚢 ⚓ ⛽ 🚧 🚦 🗺️ 🗿 🗽 🗼 🏰 🏯 🏟️ 🎡 🎢 🎠 ⛲ ⛱️ 🏖️ 🏝️ 🏜️ 🌋 ⛰️ 🏕️ ⛺ 🏠 🏡 🏢 🏥 🏦 🏨 🏪 🏫 🏛️ ⛪ 🕌 🕍 🕋 ⛩️ 🛤️ 🛣️ 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙️ 🌃 🌌 🌉 " +
    "⌚ 📱 💻 ⌨️ 🖥️ 🖨️ 🖱️ 💽 💾 💿 📀 🧮 🎥 🎞️ 📞 ☎️ 📺 📻 🎙️ ⏱️ ⏰ ⌛ 📡 🔋 🔌 💡 🔦 🕯️ 🧯 🛢️ 💸 💵 💶 💳 💎 ⚖️ 🔧 🔨 ⚒️ 🛠️ ⛏️ 🔩 ⚙️ ⛓️ 🧲 🔫 💣 🧨 🪓 🔪 🗡️ ⚔️ 🛡️ 🚬 ⚰️ ⚱️ 🏺 🔮 📿 🧿 💈 ⚗️ 🔭 🔬 🩹 🩺 💊 💉 🩸 🧬 🦠 🧫 🧪 🌡️ 🧹 🧺 🧻 🚽 🚿 🛁 🧼 🪥 🪒 🧽 🪣 🧴 🔑 🗝️ 🚪 🪑 🛋️ 🛏️ 🧸 🖼️ 🛍️ 🎁 🎈 🎏 🎀 🎊 🎉 🎎 🏮 🎐 🧧 " +
    "✉️ 📩 📨 📧 💌 📥 📤 📦 🏷️ 📪 📫 📬 📭 📮 📜 📃 📄 📑 🧾 📊 📈 📉 🗒️ 🗓️ 📆 📅 🗑️ 📇 🗃️ 🗳️ 🗄️ 📋 📁 📂 🗂️ 📰 🗞️ 📓 📔 📒 📕 📗 📘 📙 📚 📖 🔖 🧷 🔗 📎 🖇️ 📐 📏 📌 📍 ✂️ 🖊️ 🖋️ ✒️ 🖌️ 🖍️ 📝 ✏️ 🔍 🔎 🔏 🔐 🔒 🔓 ✅ ❌ ⚠️ ℹ️ ⛔ 🚫 ❗ ❓ ⭕ ♻️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🇹🇷 🇩🇪 🇫🇷 🇮🇹 🇪🇸 🇬🇧 🇺🇸 🇨🇦 🇯🇵 🇰🇷 🇨🇳 🇮🇳 🇧🇷 🇦🇺 🇳🇱 🇸🇪 🇳🇴 🇫🇮 🇩🇰 🇬🇷 🇵🇹 🇦🇹 🇨🇭 🇧🇪 🇵🇱 🇺🇦 🇦🇿 🇰🇿 🇸🇦 🇦🇪 🇪🇬 🇿🇦"
  ).split(" ").filter(Boolean);
  const defaults = {
    readReceipts: true,
    onlineStatus: true,
    typingIndicators: true,
    disappearing: "off",
    focusMode: false,
    accent: "mint"
  };

  let currentUser = "guest";
  let vaultPromise;
  let toastTimer;
  let lobbyRoom;
  let callRoom;
  let currentCall;
  let callRoot;
  let callTimer;

  function safeUser(user) {
    return String(user || "guest").replace(/[^a-z0-9çğıöşü_.-]/gi, "").slice(0, 64) || "guest";
  }

  function prefKey(user) {
    return PREF_PREFIX + safeUser(user);
  }

  function getPrefs(user) {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(prefKey(user)) || "{}"));
    } catch {
      return Object.assign({}, defaults);
    }
  }

  function savePrefs(prefs) {
    localStorage.setItem(prefKey(currentUser), JSON.stringify(prefs));
    if (window.__chatAppComponent && typeof window.__chatAppComponent.applyProPrefs === "function") {
      window.__chatAppComponent.applyProPrefs();
    }
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
    });
  }

  function bytesToB64(bytes) {
    let out = "";
    new Uint8Array(bytes).forEach(function (byte) { out += String.fromCharCode(byte); });
    return btoa(out);
  }

  function b64ToBytes(value) {
    const raw = atob(value);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
    return out;
  }

  function openVault() {
    if (vaultPromise) return vaultPromise;
    vaultPromise = new Promise(function (resolve, reject) {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = function () {
        const db = request.result;
        if (!db.objectStoreNames.contains("keys")) db.createObjectStore("keys");
        if (!db.objectStoreNames.contains("data")) db.createObjectStore("data");
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
    return vaultPromise;
  }

  function txValue(db, store, mode, key, value) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(store, mode);
      const objectStore = tx.objectStore(store);
      const request = value === undefined ? objectStore.get(key) : objectStore.put(value, key);
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }

  async function vaultKey(db) {
    let key = await txValue(db, "keys", "readonly", "phone-key");
    if (!key) {
      key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
      await txValue(db, "keys", "readwrite", "phone-key", key);
    }
    return key;
  }

  async function savePhone(phone) {
    const db = await openVault();
    const key = await vaultKey(db);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(phone);
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encoded);
    await txValue(db, "data", "readwrite", "phone:" + currentUser, {
      iv: bytesToB64(iv),
      value: bytesToB64(encrypted)
    });
  }

  async function loadPhone() {
    try {
      const db = await openVault();
      const key = await vaultKey(db);
      const record = await txValue(db, "data", "readonly", "phone:" + currentUser);
      if (!record) return "";
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: b64ToBytes(record.iv) },
        key,
        b64ToBytes(record.value)
      );
      return new TextDecoder().decode(decrypted);
    } catch {
      return "";
    }
  }

  function normalizePhone(value) {
    const raw = String(value || "").trim();
    const digits = raw.replace(/\D/g, "");

    if (/^05\d{9}$/.test(digits)) return "+90" + digits.slice(1);
    if (/^5\d{9}$/.test(digits)) return "+90" + digits;
    if (/^905\d{9}$/.test(digits)) return "+" + digits;
    if (raw.startsWith("+") && /^[1-9]\d{7,14}$/.test(digits)) return "+" + digits;
    return "";
  }

  function maskPhone(phone) {
    if (!phone) return "Eklenmedi";
    return phone.slice(0, 3) + " ••• ••• " + phone.slice(-2);
  }

  async function deviceFingerprint() {
    const source = [
      navigator.userAgent,
      navigator.language,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      String(screen.width) + "x" + String(screen.height)
    ].join("|");
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
    const hex = Array.from(new Uint8Array(hash)).slice(0, 10).map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("").toUpperCase();
    return hex.match(/.{1,4}/g).join("-");
  }

  function toast(message) {
    let node = document.querySelector(".cx-pro-toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "cx-pro-toast";
      document.body.appendChild(node);
    }
    node.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { node.remove(); }, 2800);
  }

  function panelMarkup(prefs, maskedPhone) {
    const checked = function (key) { return prefs[key] ? " checked" : ""; };
    const selected = function (key, value) { return prefs[key] === value ? " selected" : ""; };
    return `
      <div class="cx-pro-overlay" role="dialog" aria-modal="true" aria-label="ChatApp Pro">
        <div class="cx-pro-shell">
          <aside class="cx-pro-side">
            <div class="cx-pro-brand"><span class="cx-pro-mark">PRO</span><span>ChatApp Pro</span></div>
            <nav class="cx-pro-nav" aria-label="Pro bölümleri">
              <button data-tab="overview" aria-selected="true">Genel Bakış</button>
              <button data-tab="privacy" aria-selected="false">Gizlilik</button>
              <button data-tab="focus" aria-selected="false">Odak ve Tema</button>
              <button data-tab="phone" aria-selected="false">Telefon ve Arama</button>
              <button data-tab="devices" aria-selected="false">Güvenilir Cihazlar</button>
            </nav>
            <div class="cx-pro-price"><strong>PRO</strong><span>Ücretli plan<br>Yakında sunulacak</span></div>
          </aside>
          <main class="cx-pro-main">
            <header class="cx-pro-topbar"><strong>Pro kontrol merkezi</strong><button class="cx-pro-close" aria-label="Kapat">×</button></header>
            <div class="cx-pro-content">
              <section class="cx-pro-panel" data-panel="overview">
                <div class="cx-pro-hero">
                  <div>
                    <div class="cx-pro-heading">
                      <div class="cx-pro-eyebrow">ChatApp Pro Beta</div>
                      <h2>Daha sakin, daha kontrollü sohbet.</h2>
                      <p>Gizlilik tercihlerini, odak modunu, telefon bilgisini ve bu cihazın güvenlik durumunu tek yerden yönet.</p>
                    </div>
                    <button class="cx-pro-button" data-go="privacy">Ayarları aç</button>
                  </div>
                  <img src="/pro/privacy.png" alt="ChatApp Pro gizlilik kontrolleri">
                </div>
                <div class="cx-pro-stats">
                  <div class="cx-pro-stat"><strong>Gizli telefon</strong><span>Numara yalnızca bu cihazdaki şifreli kasada tutulur.</span></div>
                  <div class="cx-pro-stat"><strong>Odak modu</strong><span>Bildirim ve çevrimiçi görünürlüğünü kontrol eder.</span></div>
                  <div class="cx-pro-stat"><strong>Geçici mesajlar</strong><span>Yeni mesajlar için otomatik silinme süresi seçilir.</span></div>
                </div>
                <div class="cx-pro-warning">Pro beta özellikleri güvenliği artırır fakat “sıfır açık” garantisi vermez. Ses ve görüntü aramaları aktarım sırasında şifrelenir; bağımsız güvenlik denetimleri ürün geliştikçe sürdürülecektir.</div>
              </section>

              <section class="cx-pro-panel" data-panel="privacy" hidden>
                <div class="cx-pro-heading"><div class="cx-pro-eyebrow">Gizlilik</div><h2>Ne paylaştığını sen belirle.</h2><p>Bu tercihler yalnızca senin hesabının bu cihazdaki davranışını değiştirir.</p></div>
                <img class="cx-pro-feature-visual" src="/pro/privacy.png" alt="ChatApp Pro gizlilik ekranı">
                <div class="cx-pro-section">
                  <div class="cx-pro-row"><div><h3>Okundu bilgisi</h3><p>Kapatıldığında mesaj açtığında karşı tarafa okundu işareti gönderilmez.</p></div><label class="cx-pro-switch"><input type="checkbox" data-pref="readReceipts"${checked("readReceipts")}><span></span></label></div>
                  <div class="cx-pro-row"><div><h3>Çevrimiçi durumu</h3><p>Kapatıldığında bu cihaz çevrimiçi durumunu yayınlamaz.</p></div><label class="cx-pro-switch"><input type="checkbox" data-pref="onlineStatus"${checked("onlineStatus")}><span></span></label></div>
                  <div class="cx-pro-row"><div><h3>Yazıyor göstergesi</h3><p>Mesaj yazarken karşı tarafa canlı gösterge gönderilmesini yönetir.</p></div><label class="cx-pro-switch"><input type="checkbox" data-pref="typingIndicators"${checked("typingIndicators")}><span></span></label></div>
                  <div class="cx-pro-row"><div><h3>Geçici mesajlar</h3><p>Bu ayardan sonra göndereceğin yeni mesajlara otomatik silinme süresi eklenir.</p></div><select class="cx-pro-select" data-pref="disappearing"><option value="off"${selected("disappearing", "off")}>Kapalı</option><option value="3600"${selected("disappearing", "3600")}>1 saat</option><option value="86400"${selected("disappearing", "86400")}>24 saat</option><option value="604800"${selected("disappearing", "604800")}>7 gün</option></select></div>
                </div>
              </section>

              <section class="cx-pro-panel" data-panel="focus" hidden>
                <div class="cx-pro-heading"><div class="cx-pro-eyebrow">Odak ve Tema</div><h2>Sohbetin ritmini ayarla.</h2><p>Ürettiğimiz Pro arayüzündeki koyu petrol zeminini farklı vurgu renkleriyle kişiselleştir.</p></div>
                <img class="cx-pro-feature-visual" src="/pro/personalization.png" alt="ChatApp Pro tema ve odak ekranı">
                <div class="cx-pro-section">
                  <div class="cx-pro-row"><div><h3>Odak modu</h3><p>Açıkken bu cihaz yeni bildirim izni istemez ve çevrimiçi durumunu sessiz tutar.</p></div><label class="cx-pro-switch"><input type="checkbox" data-pref="focusMode"${checked("focusMode")}><span></span></label></div>
                  <div class="cx-pro-row"><div><h3>Vurgu rengi</h3><p>Butonlar, okunma işaretleri ve Pro kontrollerinin sinyal rengini seç.</p></div><div class="cx-pro-colors"><button class="cx-pro-color" data-accent="mint" aria-label="Nane yeşili" aria-pressed="${prefs.accent === "mint"}" style="background:#38e8c7"></button><button class="cx-pro-color" data-accent="blue" aria-label="Teknoloji mavisi" aria-pressed="${prefs.accent === "blue"}" style="background:#4aa3ff"></button><button class="cx-pro-color" data-accent="gold" aria-label="Altın" aria-pressed="${prefs.accent === "gold"}" style="background:#f4c765"></button></div></div>
                </div>
              </section>

              <section class="cx-pro-panel" data-panel="phone" hidden>
                <div class="cx-pro-heading"><div class="cx-pro-eyebrow">Telefon ve Arama</div><h2>ChatApp içinden güvenle ara.</h2><p>Sesli ve görüntülü aramalar kullanıcı adınla çalışır. Telefon numaran isteğe bağlıdır; diğer kullanıcılara veya ortak sohbet veritabanına gönderilmez.</p></div>
                <div class="cx-pro-section">
                  <h3>Telefon bilgisi</h3><p>0555 123 45 67, 555 123 45 67 veya +90 555 123 45 67 biçimlerinden birini kullan.</p>
                  <form class="cx-pro-phone-form"><input class="cx-pro-input" name="phone" inputmode="tel" autocomplete="tel" placeholder="+90 5xx xxx xx xx" aria-label="Telefon numarası"><button class="cx-pro-button" type="submit">Güvenli kaydet</button></form>
                  <p class="cx-pro-note">Kayıtlı: <strong data-phone-status>${escapeHtml(maskedPhone)}</strong></p>
                </div>
                <div class="cx-pro-section"><div class="cx-pro-row"><div><h3>Sesli ve görüntülü arama</h3><p>Sohbet başlığındaki telefon veya kamera düğmesiyle ara. Mikrofon ve kamera yalnızca aramayı başlattığında açılır.</p></div><span class="cx-pro-status">Etkin</span></div></div>
                <div class="cx-pro-warning">Aramalar kısa ömürlü sunucu izinleriyle kurulur ve aktarım sırasında şifrelenir. Telefon bilgisi arama için zorunlu değildir ve SMS doğrulaması yapılmaz.</div>
              </section>

              <section class="cx-pro-panel" data-panel="devices" hidden>
                <div class="cx-pro-heading"><div class="cx-pro-eyebrow">Güvenilir Cihazlar</div><h2>Bu oturumu tanı.</h2><p>Parmak izi cihazın ham bilgilerini sunucuya göndermeden, bu tarayıcıda hesaplanır.</p></div>
                <img class="cx-pro-feature-visual" src="/pro/continuity.png" alt="ChatApp Pro güvenilir cihaz ekranı">
                <div class="cx-pro-device"><div class="cx-pro-device-icon">▣</div><div><h3>Bu cihaz</h3><p>${escapeHtml(navigator.platform || "Tarayıcı")} · ${escapeHtml(Intl.DateTimeFormat().resolvedOptions().timeZone)}</p><code data-device-fingerprint>HESAPLANIYOR</code></div><span class="cx-pro-status">Aktif</span></div>
                <div class="cx-pro-warning">Bu ekran yalnızca bu tarayıcıyı gösterir. Tüm cihazlardan uzaktan çıkış için sunucu tarafı oturum yönetimi gerekir.</div>
              </section>
            </div>
          </main>
        </div>
      </div>`;
  }

  function selectTab(root, tab) {
    root.querySelectorAll("[data-tab]").forEach(function (button) {
      button.setAttribute("aria-selected", String(button.dataset.tab === tab));
    });
    root.querySelectorAll("[data-panel]").forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== tab;
    });
    const content = root.querySelector(".cx-pro-content");
    if (content) content.scrollTop = 0;
  }

  async function open(user, tab) {
    currentUser = safeUser(user);
    const existing = document.querySelector(".cx-pro-overlay");
    if (existing) existing.remove();
    const prefs = getPrefs(currentUser);
    const phone = await loadPhone();
    const host = document.createElement("div");
    host.innerHTML = panelMarkup(prefs, maskPhone(phone));
    const root = host.firstElementChild;
    document.body.appendChild(root);
    selectTab(root, tab || "overview");

    root.querySelector(".cx-pro-close").addEventListener("click", function () { root.remove(); });
    root.addEventListener("click", function (event) {
      if (event.target === root) root.remove();
    });
    root.querySelectorAll("[data-tab]").forEach(function (button) {
      button.addEventListener("click", function () { selectTab(root, button.dataset.tab); });
    });
    root.querySelectorAll("[data-go]").forEach(function (button) {
      button.addEventListener("click", function () { selectTab(root, button.dataset.go); });
    });
    root.querySelectorAll("[data-pref]").forEach(function (control) {
      control.addEventListener("change", function () {
        const next = getPrefs(currentUser);
        next[control.dataset.pref] = control.type === "checkbox" ? control.checked : control.value;
        savePrefs(next);
        toast("Pro tercihin kaydedildi.");
      });
    });
    root.querySelectorAll("[data-accent]").forEach(function (button) {
      button.addEventListener("click", function () {
        const next = getPrefs(currentUser);
        next.accent = button.dataset.accent;
        savePrefs(next);
        root.querySelectorAll("[data-accent]").forEach(function (item) {
          item.setAttribute("aria-pressed", String(item === button));
        });
        toast("Tema rengi güncellendi.");
      });
    });
    root.querySelector(".cx-pro-phone-form").addEventListener("submit", async function (event) {
      event.preventDefault();
      const input = event.currentTarget.elements.phone;
      const normalized = normalizePhone(input.value);
      if (!normalized) {
        toast("Geçerli bir cep telefonu yaz: 0555 123 45 67");
        input.focus();
        return;
      }
      try {
        await savePhone(normalized);
        root.querySelector("[data-phone-status]").textContent = maskPhone(normalized);
        input.value = "";
        toast("Telefon bu cihazdaki şifreli kasaya kaydedildi.");
      } catch {
        toast("Telefon bu cihazda kaydedilemedi.");
      }
    });
    deviceFingerprint().then(function (fingerprint) {
      const node = root.querySelector("[data-device-fingerprint]");
      if (node) node.textContent = fingerprint;
    });
    setTimeout(function () {
      const close = root.querySelector(".cx-pro-close");
      if (close) close.focus();
    }, 0);
  }

  async function api(path, body, method) {
    const response = await fetch("/api/chatapp/" + path, {
      method: method || "POST",
      credentials: "same-origin",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }
    if (!response.ok) throw new Error(data.error || "Arama hizmetine ulaşılamadı.");
    return data;
  }

  function liveKit() {
    if (!window.LivekitClient || !window.LivekitClient.Room) {
      throw new Error("Arama bileşeni yüklenemedi. Sayfayı yenileyip tekrar dene.");
    }
    return window.LivekitClient;
  }

  function displayNameFor(username) {
    const component = window.__chatAppComponent;
    const user = component && component.state && component.state.db &&
      component.state.db.users && component.state.db.users[username];
    return user && user.name ? user.name : username;
  }

  async function sendSignal(url, token, signal) {
    const LK = liveKit();
    const room = new LK.Room({ autoSubscribe: false });
    try {
      await room.connect(url, token);
      await room.localParticipant.publishData(
        new TextEncoder().encode(JSON.stringify(signal)),
        { reliable: true, topic: "chatapp-call" }
      );
      await new Promise(function (resolve) { setTimeout(resolve, 120); });
    } finally {
      room.disconnect();
    }
  }

  function callMarkup(options) {
    const incoming = options.direction === "incoming";
    const video = options.kind === "video";
    const title = incoming
      ? (video ? "Gelen görüntülü arama" : "Gelen sesli arama")
      : (video ? "Görüntülü arama" : "Sesli arama");
    return `
      <div class="cx-call-overlay" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
        <div class="cx-call-shell">
          <header class="cx-call-head">
            <div><span class="cx-call-signal"></span><strong>${escapeHtml(title)}</strong></div>
            <span>Aktarım sırasında şifreli</span>
          </header>
          <div class="cx-call-stage${video ? "" : " is-audio"}">
            <video data-remote-video autoplay playsinline></video>
            <audio data-remote-audio autoplay></audio>
            <div class="cx-call-avatar">${escapeHtml((options.name || "?").trim().slice(0, 1).toUpperCase())}</div>
            <video class="cx-call-local" data-local-video autoplay playsinline muted${video ? "" : " hidden"}></video>
          </div>
          <div class="cx-call-meta">
            <h2>${escapeHtml(options.name || "ChatApp kullanıcısı")}</h2>
            <p data-call-status>${incoming ? "Seni arıyor" : "Güvenli kanal hazırlanıyor"}</p>
          </div>
          <div class="cx-call-controls">
            ${incoming ? `
              <button class="cx-call-action decline" data-call-action="decline" type="button">Reddet</button>
              <button class="cx-call-action accept" data-call-action="accept" type="button">Kabul et</button>
            ` : `
              <button class="cx-call-control" data-call-action="microphone" type="button" aria-pressed="true">Mikrofon</button>
              ${video ? `<button class="cx-call-control" data-call-action="camera" type="button" aria-pressed="true">Kamera</button>` : ""}
              <button class="cx-call-action hangup" data-call-action="hangup" type="button">Kapat</button>
            `}
          </div>
        </div>
      </div>`;
  }

  function renderCall(options) {
    if (callRoot) callRoot.remove();
    const host = document.createElement("div");
    host.innerHTML = callMarkup(options);
    callRoot = host.firstElementChild;
    document.body.appendChild(callRoot);
    return callRoot;
  }

  function setCallStatus(message) {
    const status = callRoot && callRoot.querySelector("[data-call-status]");
    if (status) status.textContent = message;
  }

  function updateControl(action, enabled) {
    const control = callRoot && callRoot.querySelector(`[data-call-action="${action}"]`);
    if (!control) return;
    control.setAttribute("aria-pressed", String(enabled));
    control.classList.toggle("is-off", !enabled);
  }

  function attachRemoteTrack(track) {
    if (!callRoot) return;
    const selector = track.kind === "video" ? "[data-remote-video]" : "[data-remote-audio]";
    const element = callRoot.querySelector(selector);
    if (element) track.attach(element);
    if (track.kind === "video") callRoot.querySelector(".cx-call-stage")?.classList.add("has-remote-video");
  }

  function attachLocalCamera() {
    if (!callRoom || !callRoot) return;
    const LK = liveKit();
    const publication = callRoom.localParticipant.getTrackPublication(LK.Track.Source.Camera);
    const element = callRoot.querySelector("[data-local-video]");
    if (publication && publication.track && element) publication.track.attach(element);
  }

  function clearCall(message) {
    clearTimeout(callTimer);
    const room = callRoom;
    callRoom = null;
    currentCall = null;
    if (room) room.disconnect();
    if (callRoot) callRoot.remove();
    callRoot = null;
    if (message) toast(message);
  }

  async function joinCall(url, token) {
    const LK = liveKit();
    const room = new LK.Room({ adaptiveStream: true, dynacast: true });
    callRoom = room;

    room.on(LK.RoomEvent.TrackSubscribed, function (track) {
      attachRemoteTrack(track);
    });
    room.on(LK.RoomEvent.TrackUnsubscribed, function (track) {
      track.detach();
    });
    room.on(LK.RoomEvent.ParticipantConnected, function () {
      if (currentCall) currentCall.connected = true;
      setCallStatus("Bağlandı");
    });
    room.on(LK.RoomEvent.ParticipantDisconnected, function () {
      if (callRoom === room && room.remoteParticipants.size === 0) {
        clearCall("Arama sona erdi.");
      }
    });
    room.on(LK.RoomEvent.Disconnected, function () {
      if (callRoom === room) clearCall("Arama bağlantısı kapandı.");
    });

    await room.connect(url, token);
    if (room.remoteParticipants.size > 0) {
      currentCall.connected = true;
      setCallStatus("Bağlandı");
    }
    await room.localParticipant.setMicrophoneEnabled(true);
    currentCall.micEnabled = true;
    updateControl("microphone", true);
    if (currentCall.kind === "video") {
      await room.localParticipant.setCameraEnabled(true);
      currentCall.cameraEnabled = true;
      updateControl("camera", true);
      attachLocalCamera();
    }
  }

  async function toggleMedia(action) {
    if (!callRoom || !currentCall) return;
    try {
      if (action === "microphone") {
        currentCall.micEnabled = !currentCall.micEnabled;
        await callRoom.localParticipant.setMicrophoneEnabled(currentCall.micEnabled);
        updateControl(action, currentCall.micEnabled);
      } else if (action === "camera") {
        currentCall.cameraEnabled = !currentCall.cameraEnabled;
        await callRoom.localParticipant.setCameraEnabled(currentCall.cameraEnabled);
        updateControl(action, currentCall.cameraEnabled);
        if (currentCall.cameraEnabled) attachLocalCamera();
      }
    } catch {
      toast(action === "camera" ? "Kamera değiştirilemedi." : "Mikrofon değiştirilemedi.");
    }
  }

  async function cancelPendingCall() {
    const active = currentCall;
    if (!active) return;
    if (active.direction === "outgoing" && !active.connected && active.invite) {
      try {
        const response = await api("calls/cancel", { invite: active.invite });
        await sendSignal(response.url, response.token, response.signal);
      } catch {
        // The local call still closes even when the remote cancellation cannot be delivered.
      }
    }
    clearCall("Arama kapatıldı.");
  }

  function bindActiveCallControls() {
    if (!callRoot) return;
    callRoot.querySelector("[data-call-action='hangup']")?.addEventListener("click", cancelPendingCall);
    callRoot.querySelector("[data-call-action='microphone']")?.addEventListener("click", function () {
      toggleMedia("microphone");
    });
    callRoot.querySelector("[data-call-action='camera']")?.addEventListener("click", function () {
      toggleMedia("camera");
    });
  }

  async function declineIncoming() {
    const active = currentCall;
    if (!active || active.direction !== "incoming") return;
    try {
      const response = await api("calls/decline", { invite: active.invite });
      await sendSignal(response.url, response.token, response.signal);
    } catch {
      // Closing the local prompt remains possible if the caller has already left.
    }
    clearCall();
  }

  async function acceptIncoming() {
    const active = currentCall;
    if (!active || active.direction !== "incoming") return;
    try {
      setCallStatus("Bağlanıyor");
      const response = await api("calls/accept", { invite: active.invite });
      renderCall({
        direction: "active",
        kind: response.kind,
        name: active.name
      });
      currentCall.direction = "active";
      currentCall.kind = response.kind;
      bindActiveCallControls();
      await joinCall(response.url, response.callToken);
    } catch (error) {
      clearCall();
      toast(error.message || "Aramaya bağlanılamadı.");
    }
  }

  async function showIncoming(signal) {
    if (currentCall) {
      try {
        const response = await api("calls/decline", { invite: signal.invite });
        await sendSignal(response.url, response.token, response.signal);
      } catch {
        // Busy calls expire automatically if a decline cannot be delivered.
      }
      return;
    }
    const name = displayNameFor(signal.caller);
    currentCall = {
      direction: "incoming",
      invite: signal.invite,
      kind: signal.kind,
      target: signal.caller,
      name: name,
      connected: false
    };
    renderCall({ direction: "incoming", kind: signal.kind, name: name });
    callRoot.querySelector("[data-call-action='accept']").addEventListener("click", acceptIncoming);
    callRoot.querySelector("[data-call-action='decline']").addEventListener("click", declineIncoming);
    callTimer = setTimeout(function () {
      if (currentCall && currentCall.invite === signal.invite) clearCall("Arama yanıtlanmadı.");
    }, 90000);
  }

  function handleLobbyData(data) {
    let signal;
    try {
      signal = JSON.parse(new TextDecoder().decode(data));
    } catch {
      return;
    }
    if (signal.type === "call-invite" && signal.invite && signal.caller) {
      showIncoming(signal);
      return;
    }
    if (
      currentCall &&
      signal.invite === currentCall.invite &&
      (signal.type === "call-declined" || signal.type === "call-cancelled")
    ) {
      clearCall(signal.type === "call-declined" ? "Arama reddedildi." : "Arama iptal edildi.");
    }
  }

  async function connectLobby() {
    const LK = liveKit();
    if (lobbyRoom) lobbyRoom.disconnect();
    const response = await api("lobby", {});
    const room = new LK.Room({ autoSubscribe: false });
    lobbyRoom = room;
    room.on(LK.RoomEvent.DataReceived, handleLobbyData);
    await room.connect(response.url, response.token);
    return true;
  }

  async function authenticate(user, password) {
    currentUser = safeUser(user);
    await api("session", { username: currentUser, password: password });
    return connectLobby();
  }

  async function resume(user) {
    currentUser = safeUser(user);
    const session = await api("session", undefined, "GET");
    if (safeUser(session.username) !== currentUser) return false;
    return connectLobby();
  }

  async function signOut() {
    clearCall();
    if (lobbyRoom) lobbyRoom.disconnect();
    lobbyRoom = null;
    try {
      await api("session", undefined, "DELETE");
    } catch {
      // The local sign-out is complete even if the expired cookie cannot be cleared.
    }
  }

  async function startCall(options) {
    currentUser = safeUser(options && options.user);
    const target = safeUser(options && options.target);
    if (!target || target === "guest" || !options || !options.name) {
      toast("Aranacak kişi bulunamadı.");
      return;
    }
    if (currentCall) {
      toast("Önce mevcut aramayı kapat.");
      return;
    }
    try {
      const response = await api("calls/start", {
        target: target,
        kind: options.kind === "video" ? "video" : "audio"
      });
      currentCall = {
        direction: "outgoing",
        invite: response.invite,
        kind: options.kind === "video" ? "video" : "audio",
        target: target,
        name: options.name,
        connected: false,
        micEnabled: false,
        cameraEnabled: false
      };
      renderCall({
        direction: "outgoing",
        kind: currentCall.kind,
        name: options.name
      });
      bindActiveCallControls();
      await joinCall(response.url, response.callToken);
      await sendSignal(response.url, response.lobbyToken, response.signal);
      if (!currentCall.connected) setCallStatus("Aranıyor");
      callTimer = setTimeout(function () {
        if (currentCall && !currentCall.connected) cancelPendingCall();
      }, 90000);
    } catch (error) {
      clearCall();
      toast(error.message || "Arama başlatılamadı.");
    }
  }

  window.ChatAppPro = {
    open: open,
    startCall: startCall,
    authenticate: authenticate,
    resume: resume,
    signOut: signOut,
    getPrefs: getPrefs,
    normalizePhone: normalizePhone,
    emojis: function () { return EMOJIS.slice(); }
  };
}());
