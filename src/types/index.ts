export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'portraits' | 'events' | 'commercial' | 'nature' | 'all';
  title: string;
  description?: string;
  width: number;
  height: number;
  createdAt: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  features: string[];
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

export interface SiteContent {
  about: {
    headline: string;
    body: string;
    stats: {
      projects: number;
      years: number;
      awards: number;
    };
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    hours: string;
  };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    pinterest: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export type FilterCategory = 'all' | 'portraits' | 'events' | 'commercial' | 'nature';
