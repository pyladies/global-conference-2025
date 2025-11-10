import { languages } from './ui';

export function getSupportedLocales(): string[] {
  return Object.keys(languages);
}

export function getLocaleStaticPaths() {
  return getSupportedLocales().map((lang) => ({ params: { lang } }));
}

export function isValidLocale(locale: string): boolean {
  return getSupportedLocales().includes(locale);
}
