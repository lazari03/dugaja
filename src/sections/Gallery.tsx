import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/siteData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { FilterCategory } from '@/types';

const categories: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'portraits', label: 'Portraits' },
  { value: 'events', label: 'Events' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'nature', label: 'Nature' },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });

  const filteredImages =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const handleFilterChange = (filter: FilterCategory) => {
    if (filter === activeFilter) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setIsAnimating(false);
    }, 200);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  // Masonry layout - distribute images into columns
  const distributeImages = (images: typeof galleryImages, columns: number) => {
    const cols: typeof galleryImages[] = Array.from({ length: columns }, () => []);
    images.forEach((img, index) => {
      cols[index % columns].push(img);
    });
    return cols;
  };

  const columnImages = distributeImages(filteredImages, 3);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 md:py-32 bg-stone-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="section-label justify-center flex"
            style={{
              animation: isVisible
                ? 'fadeUp 0.6s var(--ease-expo-out) 0s forwards'
                : 'none',
              opacity: 0,
            }}
          >
            Portfolio
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
            Featured Work
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
            A curated selection of my favorite projects
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          style={{
            animation: isVisible
              ? 'fadeUp 0.6s var(--ease-expo-out) 0.3s forwards'
              : 'none',
            opacity: 0,
          }}
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleFilterChange(category.value)}
              className={`px-6 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                activeFilter === category.value
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black/70 hover:text-black hover:bg-black/5'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {columnImages.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {column.map((image, imgIndex) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden cursor-pointer img-zoom"
                  onClick={() =>
                    openLightbox(
                      filteredImages.findIndex((img) => img.id === image.id)
                    )
                  }
                  style={{
                    animation: isVisible
                      ? `fadeUp 0.7s var(--ease-expo-out) ${0.4 + (colIndex * 3 + imgIndex) * 0.1}s forwards`
                      : 'none',
                    opacity: 0,
                    transform: 'translateY(40px)',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-end">
                    <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <h4 className="font-serif text-xl mb-1">{image.title}</h4>
                      <p className="text-white/70 text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div
          className="text-center mt-12"
          style={{
            animation: isVisible
              ? 'fadeUp 0.6s var(--ease-expo-out) 0.8s forwards'
              : 'none',
            opacity: 0,
          }}
        >
          <button
            onClick={() => {
              const allFilter = document.querySelector('[data-filter="all"]');
              if (allFilter) {
                (allFilter as HTMLButtonElement).click();
              }
            }}
            className="btn-outline"
          >
            View Full Gallery
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[currentImageIndex].src}
              alt={filteredImages[currentImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain"
              style={{ animation: 'scaleIn 0.3s var(--ease-expo-out)' }}
            />
            <div className="text-center mt-4 text-white">
              <h4 className="font-serif text-xl">
                {filteredImages[currentImageIndex].title}
              </h4>
              <p className="text-white/60 text-sm mt-1">
                {filteredImages[currentImageIndex].description}
              </p>
              <p className="text-white/40 text-xs mt-2">
                {currentImageIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
