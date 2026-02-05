import { ContactForm } from "@/components/ContactForm";
import { HeroMedia } from "@/components/HeroMedia";
import { LightboxGallery } from "@/components/LightboxGallery";
import { Navigation } from "@/components/Navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Section } from "@/components/Section";
import { siteContent } from "@/data/site";

export default function Home() {
  return (
    <main className="page">
      <Navigation />
      <SmoothScroll />
      <ScrollReveal />

      <div className="scroll-container" data-scroll-container>
        <section id="home" className="hero-section" data-scroll-section>
          <HeroMedia image={siteContent.portfolio[0].src} />
          <div className="hero-content reveal">
            <p className="hero-subtitle">{siteContent.heroSubtitle}</p>
            <h1>{siteContent.name}</h1>
            <p className="hero-tagline">{siteContent.taglines[0]}</p>
            <p className="hero-tagline hero-tagline--alt">{siteContent.taglines[1]}</p>
            <a className="hero-scroll" href="#about" aria-label="Scroll down">
              ↓
            </a>
          </div>
        </section>

        <Section
          id="about"
          eyebrow="About"
          title={siteContent.aboutHeadline}
          subtitle="A studio dedicated to analog craft and quiet storytelling."
        >
          <div className="about-grid reveal">
            <div>
              <p>{siteContent.aboutBody}</p>
            </div>
            <div className="about-media">
              {/* REPLACE: Studio interior or photographer portrait */}
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e4?auto=format&fit=crop&w=1200&q=80"
                alt="Dugaja Photography Studio"
                loading="lazy"
              />
            </div>
          </div>
        </Section>

        <Section
          id="services"
          eyebrow="What we do"
          title="Analog experiences, tailored with care"
          subtitle="Four core offerings with a handcrafted approach."
        >
          <div className="services-grid reveal">
            {siteContent.services.map((service) => (
              <article key={service.title} className="service-card">
                <div className="service-card__media">
                  {/* REPLACE: Service imagery */}
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                  />
                </div>
                <div className="service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="portfolio"
          eyebrow="Portfolio"
          title="Selected work"
          subtitle="A curated archive of analog portraits, instant sessions, and timeless stories."
        >
          <div className="reveal">
            {/* REPLACE: Portfolio images */}
            <LightboxGallery images={siteContent.portfolio} />
          </div>
        </Section>

        <Section
          id="philosophy"
          eyebrow="Philosophy"
          title="Process before volume"
          subtitle="We choose slow photography that honors the craft."
        >
          <div className="philosophy reveal">
            <blockquote>{siteContent.philosophyQuote}</blockquote>
            <ul>
              {siteContent.philosophyBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="who"
          eyebrow="Who it&apos;s for"
          title="Built for people who love analog"
          subtitle="If you value intention and texture, this studio is for you."
        >
          <ul className="who-grid reveal">
            {siteContent.whoItsFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title="Sessions by appointment"
          subtitle="Reach out to plan your next analog story."
        >
          <div className="contact-grid reveal">
            <div className="contact-info">
              <h3>Visit the studio</h3>
              <p>{siteContent.location}</p>
              <p>Sessions by appointment.</p>
              <div className="contact-links">
                <a href="mailto:hello@dugaja.com">hello@dugaja.com</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </div>
              <iframe
                title="Studio location"
                loading="lazy"
                src="https://www.google.com/maps?q=Rruga%20Gjuhadol%2C%20Shkoder&output=embed"
              />
            </div>
            <ContactForm />
          </div>
        </Section>

        <footer className="footer" data-scroll-section>
          <p>© 2025 Dugaja e Fotografisë</p>
          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#portfolio">Portfolio</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              FB
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="mailto:hello@dugaja.com">Email</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
