import { vi } from "vitest";

export const appDataDir = vi.fn(() => Promise.resolve("/tmp/nymiria"));
export const appConfigDir = vi.fn(() => Promise.resolve("/tmp/nymiria/config"));
export const appCacheDir = vi.fn(() => Promise.resolve("/tmp/nymiria/cache"));
export const appLogDir = vi.fn(() => Promise.resolve("/tmp/nymiria/logs"));

export const resolve = vi.fn((...paths: string[]) => paths.join("/"));
export const join = vi.fn((...paths: string[]) => paths.join("/"));
export const basename = vi.fn((path: string) => path.split("/").pop() || "");
export const dirname = vi.fn((path: string) => path.split("/").slice(0, -1).join("/"));
export const extname = vi.fn((path: string) => {
  const parts = path.split(".");
  return parts.length > 1 ? `.${parts.pop()}` : "";
});

export const normalize = vi.fn((path: string) => path);
export const isAbsolute = vi.fn((_path: string) => true);
