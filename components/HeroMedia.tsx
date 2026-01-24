"use client";

import { useEffect, useState } from "react";

export function HeroMedia() {
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
    <div
      className="hero-media"
      style={{ transform: `translateY(${offset}px)` }}
      aria-hidden="true"
    />
  );
}
