import { vi } from "vitest";

export const invoke = vi.fn((_cmd: string, _args?: Record<string, unknown>) =>
  Promise.resolve({})
);

export const convertFileSrc = vi.fn((path: string) => `/local/${path}`);

export const platform = vi.fn(() => Promise.resolve({ os: "linux", arch: "x86_64" }));

export const exit = vi.fn((_code?: number) => Promise.resolve());

export const relaunch = vi.fn(() => Promise.resolve());

export const isTauri = vi.fn(() => true);
