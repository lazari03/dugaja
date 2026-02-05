import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="section" data-scroll-section>
      <div className="section__header">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
      </div>
      <div className="section__content">{children}</div>
    </section>
  );
}
