import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavbarScroll } from '@/hooks/useScrollAnimation';

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const { isScrolled, isVisible } = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.slice(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className={`font-serif text-2xl font-bold tracking-tight transition-all duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              } hover:tracking-wider`}
            >
              PhotoFolio.
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 underline-animate ${
                    isScrolled ? 'text-black/80' : 'text-white/90'
                  } ${
                    activeSection === link.href.slice(1)
                      ? isScrolled
                        ? 'text-black'
                        : 'text-white'
                      : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, '#gallery')}
                className={`px-6 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                  isScrolled
                    ? 'bg-black text-white hover:bg-black/80'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                View Work
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white text-2xl font-serif font-medium tracking-wide hover:text-white/70 transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: isMobileMenuOpen ? 'fadeUp 0.5s var(--ease-expo-out) forwards' : 'none',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
