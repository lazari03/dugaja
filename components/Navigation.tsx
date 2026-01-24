"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Safety", href: "#safety" },
  { label: "Contact", href: "#contact" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <header className={`top-nav ${isScrolled ? "top-nav--scrolled" : ""}`}>
      <div className="top-nav__inner">
        <a className="top-nav__brand" href="#top">
          ALEX BECHER
        </a>
        <nav className="top-nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="top-nav__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="visually-hidden">Toggle menu</span>
          <span className="top-nav__bar" />
          <span className="top-nav__bar" />
          <span className="top-nav__bar" />
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
      >
        <div className="mobile-menu__content">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
