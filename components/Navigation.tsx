"use client";

import { useEffect, useState } from "react";

const sidebarLinks = [
  { label: "Home", href: "#home" },
  { label: "Contact", href: "#contact" },
  { label: "Packages", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" }
];

const topLinks = [
  { label: "Wedding", href: "#services" },
  { label: "Birthdays", href: "#services" },
  { label: "Corporate", href: "#services" },
  { label: "Events", href: "#services" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <aside className="sidebar-nav">
        <div className="sidebar-nav__brand">DUGAJA</div>
        <nav aria-label="Section navigation">
          {sidebarLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </aside>

      <header className="top-menu">
        <div className="top-menu__brand">Dugaja e Fotografisë</div>
        <nav className="top-menu__links" aria-label="Primary">
          {topLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="top-menu__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="visually-hidden">Toggle menu</span>
          <span className="top-menu__bar" />
          <span className="top-menu__bar" />
          <span className="top-menu__bar" />
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
      >
        <div className="mobile-menu__content">
          {[...sidebarLinks, ...topLinks].map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
