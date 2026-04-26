/**
 * Thin Upstash Redis REST client.
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel env vars.
 * Get these from: https://console.upstash.com → create free Redis DB → REST API tab.
 */

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis<T = unknown>(...args: (string | number)[]): Promise<T> {
  if (!url || !token) throw new Error("Upstash env vars not set");
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const { result, error } = await res.json() as { result: T; error?: string };
  if (error) throw new Error(error);
  return result;
}

export async function incr(key: string): Promise<number> {
  return redis<number>("INCR", key);
}

export async function get(key: string): Promise<string | null> {
  return redis<string | null>("GET", key);
}

export async function set(key: string, value: string): Promise<void> {
  await redis("SET", key, value);
}

/** Increment a counter and return the new value. No-op if env vars are missing. */
export async function safeIncr(key: string): Promise<number> {
  try { return await incr(key); } catch { return 0; }
}

/** Get a value, return null if missing or env vars not set. */
export async function safeGet(key: string): Promise<string | null> {
  try { return await get(key); } catch { return null; }
}

/** Set a value with no-op on error. */
export async function safeSet(key: string, value: string): Promise<void> {
  try { await set(key, value); } catch { /* non-critical */ }
}

/** Push to a list and trim to maxLen. No-op on error. */
export async function safeLpush(key: string, value: string, maxLen = 500): Promise<void> {
  try {
    await redis("LPUSH", key, value);
    await redis("LTRIM", key, 0, maxLen - 1);
  } catch { /* non-critical */ }
}

/** Get range from a list. Returns [] on error. */
export async function safeLrange(key: string, start: number, stop: number): Promise<string[]> {
  try { return await redis<string[]>("LRANGE", key, start, stop); } catch { return []; }
}

export function isConfigured(): boolean {
  return !!(url && token);
}
