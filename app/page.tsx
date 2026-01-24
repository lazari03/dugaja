import { ContactForm } from "@/components/ContactForm";
import { HeroMedia } from "@/components/HeroMedia";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { siteContent } from "@/data/site";

export default function Home() {
  return (
    <main id="top">
      <Navigation />
      <div className="hero-layout">
        <aside className="hero-rail">
          <div className="hero-rail__stack">
            <div className="hero-rail__image hero-rail__image--one" />
            <div className="hero-rail__image hero-rail__image--two" />
            <div className="hero-rail__image hero-rail__image--three" />
            <button className="hero-rail__cta" type="button">
              View all projects
            </button>
          </div>
          <div className="hero-rail__card">
            <h3>Let&apos;s make something great together.</h3>
            <p>Available for select commissions across Europe.</p>
          </div>
        </aside>

        <section className="hero">
          <div className="hero__media">
            <HeroMedia />
            <div className="hero__overlay">
              <p className="eyebrow">{siteContent.location}</p>
              <h1>{siteContent.featureTitle}</h1>
              <p className="hero__summary">{siteContent.featureSummary}</p>
              <div className="hero__tags">
                {siteContent.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="hero__info">
            <div>
              <p className="hero__brand">{siteContent.name}</p>
              <p className="hero__role">{siteContent.role}</p>
            </div>
            <p className="hero__intro">{siteContent.intro}</p>
            <div className="hero__actions">
              <a className="button" href="#contact">
                Book a session
              </a>
              <a className="button button--ghost" href="#projects">
                Explore portfolio
              </a>
            </div>
          </div>
        </section>
      </div>

      <Section
        id="projects"
        eyebrow="Projects"
        title="Featured commissions"
        subtitle="Recent work spanning campaign direction, editorial stories, and luxury product sets."
      >
        <div className="projects">
          {siteContent.projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card__media" />
              <div className="project-card__body">
                <p className="project-card__category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Services"
        title="Clean, end-to-end production"
        subtitle="A calm, collaborative process designed to deliver premium visuals with clarity."
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
        title="Let&apos;s build your next story"
        subtitle="Share your vision and project timeline to receive a tailored proposal."
      >
        <div className="contact">
          <div className="contact__details">
            <h3>Studio availability</h3>
            <p>
              Based in {siteContent.location}. Booking select brand campaigns and editorial
              assignments for 2024.
            </p>
            <div className="contact__highlight">
              <p>Email</p>
              <span>hello@alexbecher.com</span>
            </div>
            <div className="contact__highlight">
              <p>Instagram</p>
              <span>@alexbecher.photo</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {siteContent.name}. All rights reserved.</p>
        <div className="footer__links">
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}
