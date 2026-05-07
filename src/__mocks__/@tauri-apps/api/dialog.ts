import { vi } from "vitest";

export const open = vi.fn((_options?: {
  multiple?: boolean;
  directory?: boolean;
  filters?: Array<{ name: string; extensions: string[] }>;
}) => Promise.resolve(null));

export const save = vi.fn((_options?: {
  defaultPath?: string;
  filters?: Array<{ name: string; extensions: string[] }>;
}) => Promise.resolve(null));

export const message = vi.fn((_message: string, _options?: { title?: string; kind?: string }) =>
  Promise.resolve()
);

export const ask = vi.fn((_message: string, _options?: { title?: string; kind?: string }) =>
  Promise.resolve(true)
);

export const confirm = vi.fn((_message: string, _options?: { title?: string; kind?: string }) =>
  Promise.resolve(true)
);
