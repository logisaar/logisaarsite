// TODO(owner): Search Console is verified by DNS TXT record, so no code is needed. If an HTML meta tag is wanted instead, add VITE_GSC_VERIFICATION and render <meta name="google-site-verification"> only when it is set.
/** The one canonical origin. Every full URL (canonical, og:url, og:image, JSON-LD, sitemap) is built from this. */
export const SITE_URL = "https://www.logisaar.com";

/** Absolute URL for a site path, e.g. `siteUrl("/solutions")`. */
export const siteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
