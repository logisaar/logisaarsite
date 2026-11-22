/** The one canonical origin. Every full URL (canonical, og:url, og:image, JSON-LD, sitemap) is built from this. */
export const SITE_URL = "https://www.logisaar.com";

/** Absolute URL for a site path, e.g. `siteUrl("/solutions")`. */
export const siteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
