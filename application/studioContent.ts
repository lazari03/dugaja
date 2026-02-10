import { studioContent } from "@/data/studioContent";
import { Locale, LocalizedText } from "@/domain/studio";

export const locales: Locale[] = ["en", "sq"];

export const defaultLocale: Locale = "sq";

export function resolveLocale(lang?: string): Locale {
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }

  return defaultLocale;
}

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function getStudioContent() {
  return studioContent;
}
