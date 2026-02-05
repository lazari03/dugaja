"use client";

import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
}

export function LightboxGallery({ images }: LightboxGalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="portfolio-grid">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            className="portfolio-item"
            onClick={() => setActiveImage(image)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className="portfolio-item__overlay">View</span>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={() => setActiveImage(null)}>
            Close
          </button>
          <img src={activeImage.src} alt={activeImage.alt} />
        </div>
      ) : null}
    </>
  );
}
