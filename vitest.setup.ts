import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock all Tauri API modules
vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn((_cmd: string, _args?: Record<string, unknown>) => Promise.resolve({})),
  convertFileSrc: vi.fn((path: string) => `/local/${path}`),
  platform: vi.fn(() => Promise.resolve({ os: "linux", arch: "x86_64" })),
  exit: vi.fn(() => Promise.resolve()),
  relaunch: vi.fn(() => Promise.resolve()),
  isTauri: vi.fn(() => true),
}));

vi.mock("@tauri-apps/api/window", () => ({
  getCurrentWindow: vi.fn(() => ({
    label: "main",
    title: "Nymiria",
    close: vi.fn(() => Promise.resolve()),
    minimize: vi.fn(() => Promise.resolve()),
    maximize: vi.fn(() => Promise.resolve()),
    unmaximize: vi.fn(() => Promise.resolve()),
    toggleMaximize: vi.fn(() => Promise.resolve()),
    setFocus: vi.fn(() => Promise.resolve()),
    setTitle: vi.fn(() => Promise.resolve()),
    emit: vi.fn(() => Promise.resolve()),
    onFocusChanged: vi.fn(() => ({ unregister: vi.fn() })),
    onCloseRequested: vi.fn(() => ({ unregister: vi.fn() })),
    onMenuClicked: vi.fn(() => ({ unregister: vi.fn() })),
  })),
  appWindow: {
    label: "main",
    title: "Nymiria",
    close: vi.fn(() => Promise.resolve()),
    minimize: vi.fn(() => Promise.resolve()),
    maximize: vi.fn(() => Promise.resolve()),
    unmaximize: vi.fn(() => Promise.resolve()),
    toggleMaximize: vi.fn(() => Promise.resolve()),
    setFocus: vi.fn(() => Promise.resolve()),
    setTitle: vi.fn(() => Promise.resolve()),
    emit: vi.fn(() => Promise.resolve()),
    onFocusChanged: vi.fn(() => ({ unregister: vi.fn() })),
    onCloseRequested: vi.fn(() => ({ unregister: vi.fn() })),
    onMenuClicked: vi.fn(() => ({ unregister: vi.fn() })),
  },
  Window: vi.fn(),
}));

vi.mock("@tauri-apps/api/fs", () => ({
  readTextFile: vi.fn(() => Promise.resolve("")),
  writeTextFile: vi.fn(() => Promise.resolve()),
  readFile: vi.fn(() => Promise.resolve(new Uint8Array())),
  writeFile: vi.fn(() => Promise.resolve()),
  exists: vi.fn(() => Promise.resolve(false)),
  mkdir: vi.fn(() => Promise.resolve()),
  remove: vi.fn(() => Promise.resolve()),
  copyFile: vi.fn(() => Promise.resolve()),
  rename: vi.fn(() => Promise.resolve()),
  readDir: vi.fn(() => Promise.resolve([])),
  BaseDirectory: { AppData: 1, AppConfig: 2, Desktop: 3, Documents: 4, Download: 5, Home: 6 },
}));

vi.mock("@tauri-apps/api/path", () => ({
  appDataDir: vi.fn(() => Promise.resolve("/tmp/nymiria")),
  appConfigDir: vi.fn(() => Promise.resolve("/tmp/nymiria/config")),
  appCacheDir: vi.fn(() => Promise.resolve("/tmp/nymiria/cache")),
  appLogDir: vi.fn(() => Promise.resolve("/tmp/nymiria/logs")),
  resolve: vi.fn((...paths: string[]) => paths.join("/")),
  join: vi.fn((...paths: string[]) => paths.join("/")),
  basename: vi.fn((path: string) => path.split("/").pop() || ""),
  dirname: vi.fn((path: string) => path.split("/").slice(0, -1).join("/")),
  extname: vi.fn((path: string) => {
    const parts = path.split(".");
    return parts.length > 1 ? `.${parts.pop()}` : "";
  }),
  normalize: vi.fn((path: string) => path),
  isAbsolute: vi.fn(() => true),
}));

vi.mock("@tauri-apps/api/dialog", () => ({
  open: vi.fn(() => Promise.resolve(null)),
  save: vi.fn(() => Promise.resolve(null)),
  message: vi.fn(() => Promise.resolve()),
  ask: vi.fn(() => Promise.resolve(true)),
  confirm: vi.fn(() => Promise.resolve(true)),
}));

vi.mock("@tauri-apps/api/shell", () => ({
  open: vi.fn(() => Promise.resolve()),
  Sidecar: vi.fn(),
  Command: vi.fn(() => ({
    spawn: vi.fn(() => ({
      pid: 1,
      kill: vi.fn(() => Promise.resolve()),
      stdout: { on: vi.fn() },
      stderr: { on: vi.fn() },
      once: vi.fn(),
    })),
    execute: vi.fn(() => Promise.resolve({ stdout: "", stderr: "", code: 0 })),
  })),
}));

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  } as Response)
);

// Mock localStorage
Object.defineProperty(global, "localStorage", {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Mock crypto
if (!global.crypto) {
  (global as unknown as { crypto: object }).crypto = {};
}
(global as unknown as { crypto: { randomUUID: () => string } }).crypto.randomUUID = vi.fn(() => "test-uuid-1234");

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
