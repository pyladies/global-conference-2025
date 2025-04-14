import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

/* From astro-i18next
 * https://github.com/yassinedoghri/astro-i18next/tree/681e8384270b2b9ad384f83411075c9c3ee33f2d
 *
 * For the trailingSlash:
 * 'always' - Only match URLs that include a trailing slash (ex: "/foo/")
 * 'never' - Never match URLs that include a trailing slash (ex: "/foo")
 * 'ignore' - Match URLs regardless of whether a trailing "/" exists
 *
 */
export const handleTrailingSlash = (
  path: string,
  trailingSlash: "never"
) => {
  if (path === "/") {
    return path;
  }

  switch (trailingSlash) {
    case "always":
      return path.endsWith("/") ? path : path + "/";
    case "never":
      return path.replace(/\/$/, "");
    default:
      return path;
  }
};

/**
 * Injects the given locale to a path
 */
export const localizePath = (
  path: string = "/",
  locale: string | null = null,
  base: string = import.meta.env.BASE_URL
): string => {
  if (!locale) {
    locale = i18next.language;
  }

  let pathSegments = path.split("/").filter((segment) => segment !== "");
  const baseSegments = base.split("/").filter((segment) => segment !== "");

  if (
    JSON.stringify(pathSegments).startsWith(
      JSON.stringify(baseSegments).replace(/]+$/, "")
    )
  ) {
    // remove base from path
    pathSegments.splice(0, baseSegments.length);
  }

  path = pathSegments.length === 0 ? "" : pathSegments.join("/");
  base = baseSegments.length === 0 ? "/" : "/" + baseSegments.join("/") + "/";

  let flatRoutes = {};
  let showDefaultLocale = false;
  const { defaultLocale } = "en";
  let locales: string[] = ["en", "es"];
  const { trailingSlash } = "ignore"

  //if (!locales.includes(locale)) {
  //  console.warn(
  //    `WARNING(astro-i18next): "${locale}" locale is not supported, add it to the locales in your astro config.`
  //  );
  //  return handleTrailingSlash(`${base}${path}`, trailingSlash);
  //}

  if (pathSegments.length === 0) {
    if (showDefaultLocale) {
      return handleTrailingSlash(`${base}${locale}`, trailingSlash);
    }

    return handleTrailingSlash(
      locale === defaultLocale ? base : `${base}${locale}`,
      trailingSlash
    );
  }

  // check if the path is not already present in flatRoutes
  if (locale === defaultLocale) {
    const translatedPathKey = Object.keys(flatRoutes).find(
      (key) => flatRoutes[key] === "/" + path
    );
    if (typeof translatedPathKey !== "undefined") {
      pathSegments = translatedPathKey
        .split("/")
        .filter((segment) => segment !== "");
    }
  }

  // remove locale from pathSegments (if there is any)
  for (const locale of locales) {
    if (pathSegments[0] === locale) {
      pathSegments.shift();
      break;
    }
  }

  // prepend the given locale if it's not the base one (unless showDefaultLocale)
  if (showDefaultLocale || locale !== defaultLocale) {
    pathSegments = [locale, ...pathSegments];
  }

  const localizedPath = base + pathSegments.join("/");

  // is path translated?
  if (
    Object.prototype.hasOwnProperty.call(
      flatRoutes,
      localizedPath.replace(/\/$/, "")
    )
  ) {
    return handleTrailingSlash(
      flatRoutes[localizedPath.replace(/\/$/, "")],
      trailingSlash
    );
  }

  return handleTrailingSlash(localizedPath, trailingSlash);
};
