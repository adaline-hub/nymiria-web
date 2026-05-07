import { vi } from "vitest";

export const Window = vi.fn();

export const getCurrentWindow = vi.fn(() => ({
  label: "main",
  title: "Nymiria",
  close: vi.fn(() => Promise.resolve()),
  minimize: vi.fn(() => Promise.resolve()),
  maximize: vi.fn(() => Promise.resolve()),
  unmaximize: vi.fn(() => Promise.resolve()),
  toggleMaximize: vi.fn(() => Promise.resolve()),
  setFocus: vi.fn(() => Promise.resolve()),
  setTitle: vi.fn(() => Promise.resolve()),
  emit: vi.fn((_event: string, _payload?: unknown) => Promise.resolve()),
  onFocusChanged: vi.fn((_handler: (payload: { payload: boolean }) => void) => ({
    unregister: vi.fn(),
  })),
  onCloseRequested: vi.fn((_handler: (event: { preventDefault: () => void }) => void) => ({
    unregister: vi.fn(),
  })),
  onMenuClicked: vi.fn((_handler: (event: { id: string }) => void) => ({
    unregister: vi.fn(),
  })),
}));

export const appWindow = {
  label: "main",
  title: "Nymiria",
  close: vi.fn(() => Promise.resolve()),
  minimize: vi.fn(() => Promise.resolve()),
  maximize: vi.fn(() => Promise.resolve()),
  unmaximize: vi.fn(() => Promise.resolve()),
  toggleMaximize: vi.fn(() => Promise.resolve()),
  setFocus: vi.fn(() => Promise.resolve()),
  setTitle: vi.fn(() => Promise.resolve()),
  emit: vi.fn((_event: string, _payload?: unknown) => Promise.resolve()),
  onFocusChanged: vi.fn((_handler: (payload: { payload: boolean }) => void) => ({
    unregister: vi.fn(),
  })),
  onCloseRequested: vi.fn((_handler: (event: { preventDefault: () => void }) => void) => ({
    unregister: vi.fn(),
  })),
  onMenuClicked: vi.fn((_handler: (event: { id: string }) => void) => ({
    unregister: vi.fn(),
  })),
};
