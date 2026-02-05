import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { siteContent } from "@/data/site";

export default function Home() {
  return (
    <main>
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">{siteContent.location}</p>
          <h1>{siteContent.name}</h1>
          <p className="hero__role">{siteContent.role}</p>
          <p className="hero__intro">{siteContent.intro}</p>
          <div className="hero__actions">
            <a className="button" href="#contact">
              Book a session
            </a>
            <a className="button button--ghost" href="#portfolio">
              View portfolio
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__frame" aria-hidden="true">
            <div className="hero__grid" />
            <div className="hero__overlay">
              <p>Capturing modern love, light, and movement.</p>
            </div>
          </div>
        </div>
      </header>

      <Section
        id="about"
        eyebrow="About"
        title="A calm, modern approach to visual storytelling"
        subtitle="Every story is crafted with intention, from soft film grain to art-directed editorials."
      >
        <div className="cards">
          {siteContent.highlights.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="portfolio"
        eyebrow="Portfolio"
        title="Featured work"
        subtitle="A curated selection of recent commissions and personal studies."
      >
        <div className="portfolio">
          {siteContent.portfolio.map((item) => (
            <article key={item.title} className="portfolio__item">
              <div className="portfolio__meta">
                <p className="portfolio__category">{item.category}</p>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Services"
        title="Tailored photography experiences"
        subtitle="Intentional coverage designed around your needs, timeline, and aesthetic."
      >
        <div className="services">
          {siteContent.services.map((service) => (
            <article key={service.label} className="service">
              <h3>{service.label}</h3>
              <p>{service.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="safety"
        eyebrow="Safety"
        title="Safety-first collaboration"
        subtitle="Every inquiry is protected with privacy-conscious practices."
      >
        <ul className="safety">
          {siteContent.safety.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Let's create something intentional"
        subtitle="Share your vision and preferred dates, and we'll craft a tailored proposal."
      >
        <div className="contact">
          <div className="contact__details">
            <h3>Studio availability</h3>
            <p>
              Currently booking editorial and brand projects for Q3 2024, with limited weddings
              each month to keep every story intimate.
            </p>
            <div className="contact__highlight">
              <p>Email</p>
              <span>hello@ariasolace.com</span>
            </div>
            <div className="contact__highlight">
              <p>Based in</p>
              <span>{siteContent.location}</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {siteContent.name}. All rights reserved.</p>
        <div className="footer__links">
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}
