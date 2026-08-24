import Image from "next/image";

const appUrl = "/chat/index.html";
const githubUrl = "https://github.com/ilerisoyomer34-coder/chatapp-pro";

const trustSignals = [
  "Gizlilik odaklı sohbet deneyimi",
  "Modern ve sade arayüz",
  "Herkes için kolay başlangıç",
];

const features = [
  {
    title: "Güvenli konuşma alanı",
    body: "Özel konuşmalar için daha kontrollü, sade ve güven veren bir sohbet ortamı sunar.",
  },
  {
    title: "Karmaşık olmayan deneyim",
    body: "ChatApp, güvenlik hissini ağırlaştırmadan günlük mesajlaşma akışına taşır.",
  },
  {
    title: "Premium ürün hissi",
    body: "Net tipografi, hızlı erişim ve dikkat dağıtmayan ekranlarla modern bir kullanım hedefler.",
  },
];

const plans = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    detail: "Uygulamayı keşfetmek isteyen herkes için.",
    note: "Temel sohbet deneyimi",
    href: appUrl,
  },
  {
    name: "Pro",
    price: "Yakında",
    detail: "Gelişmiş gizlilik, kişiselleştirme ve cihazlar arası kullanım için.",
    note: "Ücretli Pro üyeliği",
    href: "#pro",
    featured: true,
  },
  {
    name: "Ekip",
    price: "Demo ile",
    detail: "Topluluklar ve ekipler için güvenli sohbet alanı.",
    note: "Kuruma özel görüşme",
    href: `${appUrl}#demo`,
  },
];

const proFeatures = [
  {
    title: "Gelişmiş gizlilik kontrolleri",
    body: "Hangi bilginin ne kadar süre görünür kalacağını daha ayrıntılı yönet. Pro, günlük sohbet akışına ek bir kontrol katmanı getirir.",
    image: "/pro/privacy.png",
    alt: "ChatApp Pro gelişmiş gizlilik kontrolleri arayüzü",
    points: [
      "Otomatik silinen mesaj seçenekleri",
      "Okundu ve çevrimiçi bilgisi kontrolleri",
      "Ek uygulama kilidi ve gizli sohbet alanı",
    ],
  },
  {
    title: "Sana göre çalışan sohbet alanı",
    body: "Temayı, mesaj görünümünü ve bildirim düzenini kullanım biçimine göre ayarla. Odak modlarıyla yalnızca önemli konuşmalara yer aç.",
    image: "/pro/personalization.png",
    alt: "ChatApp Pro tema ve odak modu ayarları arayüzü",
    points: [
      "Özel renk ve mesaj görünümleri",
      "Kişisel bildirim profilleri",
      "Sessiz saatler ve odak modları",
    ],
  },
  {
    title: "Cihazlar arasında güvenli devamlılık",
    body: "Güvendiğin cihazlarda konuşmalarına kaldığın yerden devam et. Dosya aktarımı ve cihaz doğrulaması tek bir güvenlik görünümünde buluşur.",
    image: "/pro/continuity.png",
    alt: "ChatApp Pro güvenli cihazlar arası kullanım arayüzü",
    points: [
      "Güvenilir cihaz yönetimi",
      "Şifreli dosya teslim durumu",
      "Öncelikli Pro destek kanalı",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Ana gezinme">
          <a className="brand" href="#top" aria-label="ChatApp ana sayfa">
            <span className="brand-mark">C</span>
            <span>ChatApp</span>
          </a>
          <div className="nav-links">
            <a href="#guvenlik">Güvenlik</a>
            <a href="#bekleme">Bekleme listesi</a>
            <a href="#uyelik">Üyelik</a>
            <a href="#pro">Pro</a>
          </div>
          <a className="nav-cta" href={appUrl}>
            Uygulamayı Aç
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Güvenli sohbet için modern alan</p>
            <h1>ChatApp ile konuşmalarını daha güvenli başlat.</h1>
            <p className="hero-text">
              Herkesin kolayca kullanabileceği, premium hissiyatlı ve teknoloji
              odaklı bir sohbet deneyimi. ChatApp, güvenlik kaygısını azaltıp
              konuşmaya odaklanmanı sağlar.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href={appUrl}>
                Uygulamayı Deneyin
              </a>
              <a className="secondary-button" href="#bekleme">
                Bekleme Listesine Katıl
              </a>
            </div>
            <ul className="trust-list" aria-label="ChatApp avantajları">
              {trustSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>

          <div className="phone-stage" aria-label="ChatApp ekran önizlemesi">
            <div className="signal-ring" />
            <div className="phone">
              <div className="phone-top">
                <div className="chat-person">
                  <span className="chat-avatar">Öİ</span>
                  <span>
                    <strong>Ömer İlerisoy</strong>
                    <small>Uçtan uca şifreli</small>
                  </span>
                </div>
                <span className="status">Çevrimiçi</span>
              </div>
              <div className="encryption-note">
                <span className="lock">●</span> Bu konuşma korumalı
              </div>
              <div className="message message-one">Sunum dosyasını aldın mı?</div>
              <div className="message message-two">
                Evet, şimdi inceliyorum. Buradan güvenle devam edebiliriz.
              </div>
              <div className="message message-three">
                Harika. Son notları da birazdan gönderiyorum.
              </div>
              <div className="composer">
                <span>Güvenli mesaj yaz...</span>
                <strong>→</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section split" id="guvenlik">
        <div>
          <p className="section-kicker">Neden ChatApp?</p>
          <h2>Güvenlik hissi, sade bir sohbet akışının içinde.</h2>
        </div>
        <p>
          ChatApp, teknik karmaşayı kullanıcıya yüklemeden daha güvenli bir
          konuşma ortamı oluşturmayı hedefler. İsteyen herkes hızlıca başlayıp
          modern bir mesajlaşma deneyimi yaşayabilir.
        </p>
      </section>

      <section className="feature-grid" aria-label="ChatApp özellikleri">
        {features.map((feature) => (
          <article className="feature" key={feature.title}>
            <span className="feature-icon" aria-hidden="true" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>

      <section className="conversion" id="bekleme">
        <div className="conversion-copy">
          <p className="section-kicker">Erken erişim</p>
          <h2>Bekleme listesi, demo ve üyelik ilgisini tek yerden topla.</h2>
          <p>
            İlk ziyaretçileri uygulamaya yönlendir, ilgilenenleri bekleme
            listesine çağır, demo talebi ve üyelik niyetini net aksiyonlarla
            görünür kıl.
          </p>
        </div>
        <div className="action-panel">
          <a className="panel-action active" href={appUrl}>
            <span>01</span>
            Uygulamayı hemen aç
          </a>
          <a className="panel-action" href={`${appUrl}#waitlist`}>
            <span>02</span>
            Bekleme listesine katıl
          </a>
          <a className="panel-action" href={`${appUrl}#demo`}>
            <span>03</span>
            Demo talebi oluştur
          </a>
        </div>
      </section>

      <section className="section" id="uyelik">
        <div className="section-heading">
          <p className="section-kicker">Üyelik</p>
          <h2>Farklı kullanım seviyeleri için hazır yapı.</h2>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article
              className={`plan${plan.featured ? " pro-plan" : ""}`}
              key={plan.name}
            >
              {plan.featured ? <span className="plan-badge">Yeni</span> : null}
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.detail}</p>
              <small>{plan.note}</small>
              {plan.featured ? (
                <details className="plan-details">
                  <summary>İncele</summary>
                  <div className="plan-details-content">
                    <p>
                      Pro; gelişmiş gizlilik kontrolleri, özel görünüm ve odak
                      ayarları, güvenilir cihaz yönetimi ve öncelikli destek
                      sunar.
                    </p>
                    <ul>
                      <li>Gelişmiş gizlilik</li>
                      <li>Kişisel tema ve odak modları</li>
                      <li>Güvenli cihaz devamlılığı</li>
                    </ul>
                    <strong className="availability">Yakında sunulacak.</strong>
                    <a className="pro-more-link" href="#pro">
                      Tüm Pro özelliklerini gör
                    </a>
                  </div>
                </details>
              ) : (
                <a href={plan.href}>İncele</a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="pro-section" id="pro">
        <div className="pro-inner">
          <header className="pro-header">
            <div>
              <p className="section-kicker">Ücretli üyelik</p>
              <h2>ChatApp Pro</h2>
              <p className="pro-lead">
                Daha fazla kontrol. Daha güçlü gizlilik. Günlük sohbetini kendi
                düzenine göre yönetmek isteyenler için gelişmiş bir deneyim.
              </p>
            </div>
            <div className="pro-price" aria-label="ChatApp Pro fiyat bilgisi">
              <span>Pro planı</span>
              <strong>Yakında</strong>
              <small>Ücretli üyelik</small>
            </div>
          </header>

          <div className="pro-feature-list">
            {proFeatures.map((feature, index) => (
              <article className="pro-feature" key={feature.title}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={1024}
                  height={1024}
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
                <div className="pro-feature-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                  <ul>
                    {feature.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="pro-comparison">
            <div>
              <span>ChatApp</span>
              <strong>Ücretsiz başlangıç</strong>
              <p>Temel güvenli sohbet ve günlük mesajlaşma deneyimi.</p>
            </div>
            <div className="comparison-pro">
              <span>ChatApp Pro</span>
              <strong>Ücretli Pro üyeliği</strong>
              <p>Gelişmiş kontrol, kişiselleştirme ve öncelikli destek.</p>
            </div>
          </div>

          <div className="pro-action">
            <p>
              Pro üyeliği hazırlanıyor. Erken erişim listesine katılanlara
              öncelik verilecek. Yakında sunulacak.
            </p>
            <a className="primary-button" href={`${appUrl}#waitlist`}>
              Pro erken erişime katıl
            </a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <p>ChatApp&apos;i bugün dene, Pro açıldığında ilk öğrenenlerden biri ol.</p>
        <div className="final-actions">
          <a className="primary-button" href={appUrl}>
            ChatApp&apos;e Git
          </a>
          <a
            className="secondary-button"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub Deposu
          </a>
        </div>
      </section>
    </main>
  );
}
