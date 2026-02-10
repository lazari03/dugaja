import { ContactForm } from "@/components/ContactForm";
import { getStudioContent, resolveLocale, t } from "@/application/studioContent";

export default function Home({
  searchParams
}: {
  searchParams?: { lang?: string };
}) {
  const locale = resolveLocale(searchParams?.lang);
  const content = getStudioContent();
  const alternateLocale = locale === "en" ? "sq" : "en";

  return (
    <main className="studio">
      <div className="poster-shell">
        <header className="topbar">
          <span className="asterisk" aria-hidden="true">
            ✶
          </span>
          <div className="lang-toggle">
            <span>{t(content.languageLabel, locale)}</span>
            <a href={`/?lang=${alternateLocale}`}>{alternateLocale.toUpperCase()}</a>
          </div>
        </header>

        <section className="hero-panel" id="about">
          <p className="hero-subtitle">{t(content.hero.subtitle, locale)}</p>
          <h1>{content.studioName}</h1>
          <p className="hero-lines">{t(content.hero.lineOne, locale)}</p>
          <p className="hero-lines">{t(content.hero.lineTwo, locale)}</p>
          <p className="hero-description">{t(content.hero.description, locale)}</p>
        </section>

        <nav className="site-nav" aria-label="Sections">
          <a href="#about">{t(content.nav.about, locale)}</a>
          <a href="#services">{t(content.nav.services, locale)}</a>
          <a href="#philosophy">{t(content.nav.philosophy, locale)}</a>
          <a href="#audience">{t(content.nav.audience, locale)}</a>
          <a href="#contact">{t(content.nav.contact, locale)}</a>
        </nav>

        <section className="section-block section-block--light" id="services">
          <h2>{t(content.whatWeDo.title, locale)}</h2>
          <div className="card-grid">
            {content.whatWeDo.items.map((item) => (
              <article key={item.title.en} className="info-card">
                <h3>{t(item.title, locale)}</h3>
                <p>{t(item.description, locale)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block section-block--dark" id="philosophy">
          <h2>{t(content.philosophy.title, locale)}</h2>
          <p>{t(content.philosophy.intro, locale)}</p>
          <ul>
            {content.philosophy.points.map((point) => (
              <li key={point.en}>{t(point, locale)}</li>
            ))}
          </ul>
          <p>{t(content.philosophy.outro, locale)}</p>
        </section>

        <section className="section-block section-block--light">
          <h2>{t(content.space.title, locale)}</h2>
          <p>{t(content.space.description, locale)}</p>
        </section>

        <section className="section-block section-block--light" id="audience">
          <h2>{t(content.nav.audience, locale)}</h2>
          <ul className="audience-list">
            {content.audience.items.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
          <p className="audience-closing">{t(content.audience.closing, locale)}</p>
        </section>

        <section className="section-block section-block--dark">
          <h2>{t(content.location.title, locale)}</h2>
          <p className="location-address">{content.location.address}</p>
          <p>{t(content.location.details, locale)}</p>

          <h3>{t(content.sessions.title, locale)}</h3>
          <ul>
            {content.sessions.lines.map((line) => (
              <li key={line.en}>{t(line, locale)}</li>
            ))}
          </ul>
        </section>

        <section className="section-block section-block--light" id="contact">
          <h2>{t(content.contactForm.title, locale)}</h2>
          <p>{t(content.contactForm.intro, locale)}</p>
          <ContactForm
            copy={{
              nameLabel: t(content.contactForm.name, locale),
              emailLabel: t(content.contactForm.email, locale),
              messageLabel: t(content.contactForm.message, locale),
              namePlaceholder: t(content.contactForm.namePlaceholder, locale),
              emailPlaceholder: t(content.contactForm.emailPlaceholder, locale),
              messagePlaceholder: t(content.contactForm.messagePlaceholder, locale),
              submitLabel: t(content.contactForm.submit, locale),
              sendingLabel: t(content.contactForm.sending, locale),
              successMessage: t(content.contactForm.success, locale),
              genericErrorMessage: t(content.contactForm.genericError, locale),
              honeypotLabel: t(content.contactForm.honeypotLabel, locale)
            }}
          />
        </section>

        <section className="section-block section-block--light taglines">
          <h2>{t(content.taglines.title, locale)}</h2>
          <div>
            {content.taglines.items.map((tag) => (
              <p key={tag.en}>{t(tag, locale)}</p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
