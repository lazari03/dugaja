import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { siteContent } from '@/data/siteData';
import { services } from '@/data/siteData';
import { navLinks } from '@/sections/Navigation';

export function Footer() {
  const { ref: footerRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white py-16 md:py-20"
    >
      {/* Watermark Logo */}
      <div className="relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 font-serif text-[20vw] font-bold text-white/[0.03] whitespace-nowrap pointer-events-none select-none"
          style={{
            animation: isVisible ? 'fadeIn 1.5s ease-out forwards' : 'none',
            opacity: 0,
          }}
        >
          PhotoFolio.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div
            className="lg:col-span-1"
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0.2s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-block font-serif text-3xl font-bold mb-4 hover:tracking-wider transition-all duration-300"
            >
              PhotoFolio.
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Capturing life's beautiful moments with artistry and passion.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { name: 'Instagram', href: siteContent.social.instagram },
                { name: 'Facebook', href: siteContent.social.facebook },
                { name: 'Twitter', href: siteContent.social.twitter },
                { name: 'Pinterest', href: siteContent.social.pinterest },
              ].map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                  style={{
                    animation: isVisible
                      ? `scaleIn 0.4s var(--ease-spring) ${0.4 + index * 0.08}s forwards`
                      : 'none',
                    opacity: 0,
                  }}
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0.3s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            <h4 className="text-xs font-bold tracking-wider uppercase text-white/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    animation: isVisible
                      ? `fadeUp 0.4s var(--ease-expo-out) ${0.4 + index * 0.05}s forwards`
                      : 'none',
                    opacity: 0,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0.4s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            <h4 className="text-xs font-bold tracking-wider uppercase text-white/40 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 4).map((service, index) => (
                <li
                  key={service.id}
                  style={{
                    animation: isVisible
                      ? `fadeUp 0.4s var(--ease-expo-out) ${0.5 + index * 0.05}s forwards`
                      : 'none',
                    opacity: 0,
                  }}
                >
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0.5s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            <h4 className="text-xs font-bold tracking-wider uppercase text-white/40 mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-white/60">
              <li>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteContent.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContent.contact.phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {siteContent.contact.phone}
                </a>
              </li>
              <li>{siteContent.contact.location}</li>
              <li className="text-white/40 text-sm">{siteContent.contact.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            animation: isVisible
              ? 'fadeUp 0.6s var(--ease-expo-out) 0.8s forwards'
              : 'none',
            opacity: 0,
          }}
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} PhotoFolio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
