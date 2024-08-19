export const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

/**
 * Generate a URL with query parameters
 * @param path - The path to append to the site URL
 * @param params - The search params to append to the URL
 * @returns The URL with the query parameters appended
 * @example generateUrlWithParams("/api/og", { title: "Hello, World!" });
 */
export function generateUrlWithParams(
  path: string,
  params: Record<string, string | number | undefined>
) {
  const urlWithParams = new URL(SITE_URL + path);
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    urlWithParams.searchParams.set(key, String(value));
  }
  return urlWithParams.toString();
}
