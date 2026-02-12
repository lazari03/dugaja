import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { siteContent } from '@/data/siteData';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToGallery = () => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parallaxOffset = scrollY * 0.4;
  const contentOpacity = Math.max(0, 1 - scrollY / 600);
  const contentTransform = `translateY(${scrollY * 0.3}px)`;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
          transition: 'transform 0.1s linear',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1554048612-387768052bf7?w=1920&q=80"
          alt="Photographer with vintage camera"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{
          opacity: contentOpacity,
          transform: contentTransform,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Label */}
            <div
              className={`overflow-hidden mb-6 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transition: 'opacity 0.8s var(--ease-expo-out) 0.3s',
              }}
            >
              <span
                className="inline-block text-white/80 text-xs font-bold tracking-[4px] uppercase"
                style={{
                  animation: isLoaded ? 'slideRight 0.8s var(--ease-expo-out) 0.3s forwards' : 'none',
                  opacity: 0,
                }}
              >
                Photography Portfolio
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-white mb-6">
              {siteContent.hero.headline.split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden mr-3"
                >
                  <span
                    className="inline-block"
                    style={{
                      animation: isLoaded
                        ? `fadeUp 1s var(--ease-expo-out) ${0.5 + index * 0.1}s forwards`
                        : 'none',
                      opacity: 0,
                      transform: 'translateY(100%)',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              className="text-white/80 text-lg md:text-xl mb-10 max-w-lg"
              style={{
                animation: isLoaded
                  ? 'fadeUp 0.8s var(--ease-expo-out) 1s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              {siteContent.hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                animation: isLoaded
                  ? 'fadeUp 0.8s var(--ease-expo-out) 1.2s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              <button
                onClick={handleScrollToGallery}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5"
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                {siteContent.hero.ctaPrimary}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/50 text-white text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                {siteContent.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{
          animation: isLoaded ? 'fadeIn 0.8s var(--ease-expo-out) 1.5s forwards' : 'none',
          opacity: 0,
        }}
      >
        <button
          onClick={handleScrollToGallery}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
          aria-label="Scroll to gallery"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown
            size={24}
            className="animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </button>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-1/4 right-10 w-px h-32 bg-white/20 hidden lg:block"
        style={{
          animation: isLoaded ? 'fadeIn 1s var(--ease-expo-out) 1.8s forwards' : 'none',
          opacity: 0,
        }}
      />
      <div
        className="absolute bottom-1/4 right-20 w-20 h-px bg-white/20 hidden lg:block"
        style={{
          animation: isLoaded ? 'fadeIn 1s var(--ease-expo-out) 2s forwards' : 'none',
          opacity: 0,
        }}
      />
    </section>
  );
}
