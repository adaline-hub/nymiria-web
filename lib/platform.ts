export type OS = "mac" | "windows" | "linux" | "unknown";

export function detectOS(ua: string | undefined | null): OS {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (s.includes("mac os x") || s.includes("macintosh") || s.includes("darwin")) return "mac";
  if (s.includes("windows")) return "windows";
  if (s.includes("linux") || s.includes("x11")) return "linux";
  return "unknown";
}

export interface InstallCommand {
  os: OS;
  label: string;
  command: string;
  download: { label: string; href: string };
}

export const INSTALL_COMMANDS: Record<OS, InstallCommand> = {
  mac: {
    os: "mac",
    label: "macOS",
    command: "curl -fsSL https://nymiria.com/install.sh | bash",
    download: { label: "Download .dmg", href: "https://nymiria.com/api/download?platform=mac" },
  },
  windows: {
    os: "windows",
    label: "Windows",
    command: "irm https://nymiria.com/install.ps1 | iex",
    download: { label: "Download .exe", href: "https://nymiria.com/api/download?platform=windows" },
  },
  linux: {
    os: "linux",
    label: "Linux",
    command: "curl -fsSL https://nymiria.com/install.sh | bash",
    download: { label: "Download .AppImage", href: "https://nymiria.com/api/download?platform=linux" },
  },
  unknown: {
    os: "unknown",
    label: "All platforms",
    command: "curl -fsSL https://nymiria.com/install.sh | bash",
    download: { label: "See all downloads", href: "https://nymiria.com/api/download" },
  },
};
