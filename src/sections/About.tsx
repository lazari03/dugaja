import { useEffect, useRef, useState } from 'react';
import { siteContent } from '@/data/siteData';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';

export function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
  });
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projectsCount = useCountUp(siteContent.about.stats.projects, 2000);
  const yearsCount = useCountUp(siteContent.about.stats.years, 2000);
  const awardsCount = useCountUp(siteContent.about.stats.awards, 2000);

  useEffect(() => {
    if (isVisible) {
      projectsCount.startAnimation();
      yearsCount.startAnimation();
      awardsCount.startAnimation();
    }
  }, [isVisible, projectsCount, yearsCount, awardsCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            className="relative order-2 lg:order-1"
            style={{
              animation: isVisible
                ? 'fadeUp 1s var(--ease-expo-out) 0.2s forwards'
                : 'none',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            {/* Decorative Frame */}
            <div
              className="absolute -top-4 -left-4 w-full h-full border border-black/10 hidden lg:block"
              style={{
                animation: isVisible
                  ? 'fadeIn 1.2s var(--ease-expo-out) 0.4s forwards'
                  : 'none',
                opacity: 0,
              }}
            />
            
            {/* Image Container with 3D Tilt */}
            <div
              ref={imageRef}
              className="relative overflow-hidden img-zoom"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: '800px',
              }}
            >
              <div
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                  alt="Elena Martinez - Professional Photographer"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/5' }}
                />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            {/* Label */}
            <span
              className="section-label"
              style={{
                animation: isVisible
                  ? 'fadeUp 0.6s var(--ease-expo-out) 0.1s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              About Me
            </span>

            {/* Headline */}
            <h2
              className="mb-6"
              style={{
                animation: isVisible
                  ? 'fadeUp 0.8s var(--ease-expo-out) 0.2s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(30px)',
              }}
            >
              {siteContent.about.headline}
            </h2>

            {/* Body Text */}
            <div
              className="space-y-4 text-black/70 leading-relaxed mb-8"
              style={{
                animation: isVisible
                  ? 'fadeUp 0.8s var(--ease-expo-out) 0.3s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              <p>{siteContent.about.body}</p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-black/10"
              style={{
                animation: isVisible
                  ? 'fadeUp 0.8s var(--ease-expo-out) 0.4s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              <div className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-black mb-1">
                  {projectsCount.count}+
                </div>
                <div className="text-xs uppercase tracking-wider text-black/60">
                  Projects
                </div>
              </div>
              <div className="text-center border-x border-black/10">
                <div className="font-serif text-4xl md:text-5xl font-bold text-black mb-1">
                  {yearsCount.count}
                </div>
                <div className="text-xs uppercase tracking-wider text-black/60">
                  Years
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-black mb-1">
                  {awardsCount.count}+
                </div>
                <div className="text-xs uppercase tracking-wider text-black/60">
                  Awards
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-black hover:text-black/70 transition-colors"
              style={{
                animation: isVisible
                  ? 'fadeUp 0.6s var(--ease-expo-out) 0.5s forwards'
                  : 'none',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              Learn More About My Journey
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
