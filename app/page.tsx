const appUrl = "https://ilerisoyomer34-coder.github.io/chatapp-standalone/";

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
  },
  {
    name: "Premium",
    price: "Yakında",
    detail: "Daha gelişmiş güvenlik ve kişisel kullanım özellikleri için.",
  },
  {
    name: "Ekip",
    price: "Demo ile",
    detail: "Topluluklar ve ekipler için güvenli sohbet alanı.",
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
                <span>ChatApp</span>
                <span className="status">Korumalı</span>
              </div>
              <div className="message message-one">
                <span className="lock">●</span>
                Sohbet kanalı hazır.
              </div>
              <div className="message message-two">
                Güvenli bağlantı hissi, sade kullanım.
              </div>
              <div className="message message-three">
                <span className="dots">•••</span>
              </div>
              <div className="composer">
                <span>Mesaj yaz</span>
                <strong>Gönder</strong>
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
            <article className="plan" key={plan.name}>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.detail}</p>
              <a href={appUrl}>İncele</a>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p>ChatApp hazır olduğunda ilk deneyenlerden biri ol.</p>
        <a className="primary-button" href={appUrl}>
          ChatApp'e Git
        </a>
      </section>
    </main>
  );
}
