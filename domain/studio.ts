export type Locale = "en" | "sq";

export interface LocalizedText {
  en: string;
  sq: string;
}

export interface StudioService {
  title: LocalizedText;
  description: LocalizedText;
}

export interface StudioAudience {
  items: LocalizedText[];
  closing: LocalizedText;
}

export interface StudioContent {
  studioName: string;
  languageLabel: LocalizedText;
  nav: {
    about: LocalizedText;
    services: LocalizedText;
    philosophy: LocalizedText;
    audience: LocalizedText;
    contact: LocalizedText;
  };
  hero: {
    subtitle: LocalizedText;
    lineOne: LocalizedText;
    lineTwo: LocalizedText;
    description: LocalizedText;
  };
  whatWeDo: {
    title: LocalizedText;
    items: StudioService[];
  };
  philosophy: {
    title: LocalizedText;
    intro: LocalizedText;
    points: LocalizedText[];
    outro: LocalizedText;
  };
  space: {
    title: LocalizedText;
    description: LocalizedText;
  };
  audience: StudioAudience;
  location: {
    title: LocalizedText;
    address: string;
    details: LocalizedText;
  };
  sessions: {
    title: LocalizedText;
    lines: LocalizedText[];
  };
  taglines: {
    title: LocalizedText;
    items: LocalizedText[];
  };
  contactForm: {
    title: LocalizedText;
    intro: LocalizedText;
    name: LocalizedText;
    email: LocalizedText;
    message: LocalizedText;
    namePlaceholder: LocalizedText;
    emailPlaceholder: LocalizedText;
    messagePlaceholder: LocalizedText;
    submit: LocalizedText;
    sending: LocalizedText;
    success: LocalizedText;
    genericError: LocalizedText;
    honeypotLabel: LocalizedText;
  };
}
