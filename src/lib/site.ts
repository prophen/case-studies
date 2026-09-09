export function canonicalBase(): string | undefined {
  if (!process.env.SITE_URL) return undefined;
  const url = new URL(process.env.SITE_URL);
  if (url.protocol !== 'https:' || ['localhost', '127.0.0.1', 'example.com'].includes(url.hostname) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_URL must be the confirmed HTTPS site origin.');
  return url.origin;
}
