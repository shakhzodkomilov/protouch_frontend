const MEDIA_SERVER_ORIGIN =
  process.env.NEXT_PUBLIC_MEDIA_SERVER_ORIGIN ?? "46.62.220.230:9000";

const MEDIA_SERVER_PREFIX = MEDIA_SERVER_ORIGIN.endsWith("/")
  ? MEDIA_SERVER_ORIGIN
  : `${MEDIA_SERVER_ORIGIN}/`;

export const ensureHttps = (url?: string | null): string | undefined => {
  if (!url) return url as undefined;

  if (
    url.startsWith(`https://${MEDIA_SERVER_PREFIX}`) ||
    url.startsWith(`http://${MEDIA_SERVER_PREFIX}`)
  ) {
    return `http://${url.slice(url.indexOf(MEDIA_SERVER_PREFIX))}`;
  }

  if (url.startsWith("http://")) {
    return `https://${url.slice("http://".length)}`;
  }

  return url;
};

export const DEFAULT_PRODUCT_IMAGE = "/Category1.svg";
