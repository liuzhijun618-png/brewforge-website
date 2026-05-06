const DEFAULT_BASE_URL = "https://example.com";

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  if (!envUrl) {
    return DEFAULT_BASE_URL;
  }

  return normalizeBaseUrl(envUrl);
}

export function getAbsoluteUrl(path = "") {
  const baseUrl = getBaseUrl();

  if (!path) {
    return baseUrl;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}