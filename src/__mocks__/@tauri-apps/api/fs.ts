import { vi } from "vitest";

export const readTextFile = vi.fn((_path: string) => Promise.resolve(""));
export const writeTextFile = vi.fn((_path: string, _content: string) => Promise.resolve());
export const readFile = vi.fn((_path: string) => Promise.resolve(new Uint8Array()));
export const writeFile = vi.fn((_path: string, _data: Uint8Array) => Promise.resolve());
export const exists = vi.fn((_path: string) => Promise.resolve(false));
export const mkdir = vi.fn((_path: string) => Promise.resolve());
export const remove = vi.fn((_path: string) => Promise.resolve());
export const copyFile = vi.fn((_src: string, _dest: string) => Promise.resolve());
export const rename = vi.fn((_old: string, _new: string) => Promise.resolve());

export const readDir = vi.fn((_path: string) => Promise.resolve([]));
export const BaseDirectory = { AppData: 1, AppConfig: 2, Desktop: 3, Documents: 4, Download: 5, Home: 6 };
