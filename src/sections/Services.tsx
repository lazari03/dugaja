import { useState } from 'react';
import { Camera, Calendar, Briefcase, Palette, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { services } from '@/data/siteData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Calendar,
  Briefcase,
  Palette,
  MessageCircle,
};

export function Services() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
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
            Services
          </span>
          <h2
            className="mb-4"
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.1s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            What I Offer
          </h2>
          <p
            className="text-black/60 max-w-md mx-auto"
            style={{
              animation: isVisible
                ? 'fadeUp 0.8s var(--ease-expo-out) 0.2s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            Professional photography services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Camera;
            return (
              <div
                key={service.id}
                className="group relative p-8 border border-black/10 hover:border-black/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                style={{
                  animation: isVisible
                    ? `fadeUp 0.7s var(--ease-expo-out) ${0.3 + index * 0.1}s forwards`
                    : 'none',
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
                onClick={() => setSelectedService(service)}
              >
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 border border-black/10 group-hover:border-black group-hover:bg-black transition-all duration-500">
                  <Icon
                    size={24}
                    className="text-black group-hover:text-white transition-colors duration-500"
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="text-black/60 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Price */}
                {service.price && (
                  <p className="text-sm font-medium text-black/80 mb-4">
                    {service.price}
                  </p>
                )}

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-black/60 group-hover:text-black transition-colors">
                  Learn More
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>

                {/* Hover Border Animation */}
                <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16"
          style={{
            animation: isVisible
              ? 'fadeUp 0.6s var(--ease-expo-out) 0.8s forwards'
              : 'none',
            opacity: 0,
          }}
        >
          <p className="text-black/60 mb-6">
            Not sure which service is right for you?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            Schedule a Free Consultation
          </a>
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-lg">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  {(() => {
                    const Icon = iconMap[selectedService.icon] || Camera;
                    return (
                      <div className="inline-flex items-center justify-center w-12 h-12 border border-black/10">
                        <Icon size={22} />
                      </div>
                    );
                  })()}
                  <DialogTitle className="font-serif text-2xl">
                    {selectedService.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base text-black/70">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                {selectedService.price && (
                  <p className="text-lg font-medium text-black mb-6">
                    {selectedService.price}
                  </p>
                )}

                <h4 className="text-sm font-bold tracking-wider uppercase text-black/60 mb-4">
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={18} className="text-black mt-0.5 flex-shrink-0" />
                      <span className="text-black/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedService(null);
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="btn-primary w-full"
                  >
                    Book This Service
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
