import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/siteData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
  });

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-stone-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="section-label justify-center flex"
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            Testimonials
          </span>
          <h2
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.1s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            What Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          style={{
            animation: isVisible
              ? 'fadeUp 0.8s var(--ease-expo-out) 0.2s forwards'
              : 'none',
            opacity: 0,
          }}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-black/10">
            <Quote size={80} />
          </div>

          {/* Slides Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-600"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="text-center">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="fill-black text-black"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed text-black mb-8">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div>
                      <p className="font-medium text-black">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-black/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => {
              goToPrevious();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 flex items-center justify-center border border-black/20 text-black/60 hover:border-black hover:text-black transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => {
              goToNext();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 flex items-center justify-center border border-black/20 text-black/60 hover:border-black hover:text-black transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-black w-8'
                    : 'bg-black/20 hover:bg-black/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
