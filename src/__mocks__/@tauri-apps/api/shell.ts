import { vi } from "vitest";

export const open = vi.fn((_url: string) => Promise.resolve());

export const Sidecar = vi.fn();
export const Command = vi.fn((_program: string, _args?: string[]) => ({
  spawn: vi.fn(() => ({
    pid: 1,
    kill: vi.fn(() => Promise.resolve()),
    stdout: { on: vi.fn() },
    stderr: { on: vi.fn() },
    once: vi.fn(),
  })),
  execute: vi.fn(() =>
    Promise.resolve({ stdout: "", stderr: "", code: 0 })
  ),
}));
