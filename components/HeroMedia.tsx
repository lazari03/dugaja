"use client";

import { useEffect, useState } from "react";

interface HeroMediaProps {
  image: string;
}

export function HeroMedia({ image }: HeroMediaProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      {/* REPLACE: Hero image */}
      <img
        src={image}
        alt="Dugaja Photography Hero"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
}
