export const languages = {
  en: "English",
  es: "Español",
};

export const defaultLang = "en";

export function getSupportedLocales(): string[] {
  return Object.keys(languages);
}

export function getDefaultLang(): string {
  return defaultLang;
}

export function getLocaleStaticPaths() {
  return getSupportedLocales().map((lang) => ({ params: { lang } }));
}

export function isValidLocale(locale: string): boolean {
  return getSupportedLocales().includes(locale);
}
