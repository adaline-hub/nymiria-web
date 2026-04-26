import { NextRequest, NextResponse } from "next/server";
import { safeIncr, safeLpush } from "../../../lib/redis";

export const runtime = "nodejs";

const RELEASES_PAGE = "https://github.com/adaline-hub/nymiria-updates/releases/latest";
const GITHUB_RELEASES_BASE = "https://github.com/adaline-hub/nymiria-updates/releases/download";
const GITHUB_API_RELEASES = "https://api.github.com/repos/adaline-hub/nymiria-updates/releases/latest";

type Platform = "mac" | "windows" | "linux" | "other";

function platformFromAsset(name: string): Platform {
  const n = name.toLowerCase();
  if (n.includes(".dmg") || n.includes("aarch64") || n.endsWith(".app.tar.gz")) return "mac";
  if (n.includes("-setup.exe") || n.endsWith(".exe")) return "windows";
  if (n.endsWith(".appimage") || n.endsWith(".deb")) return "linux";
  return "other";
}

function versionFromAsset(name: string): string {
  const m = name.match(/_(\d+\.\d+\.\d+)[_.-]/);
  return m ? `v${m[1]}` : "unknown";
}

// Pick the best asset for a given platform from a release
function pickAsset(assets: Array<{ name: string }>, platform: Platform): string | null {
  const names = assets.map((a) => a.name);
  if (platform === "mac") {
    return names.find((n) => n.toLowerCase().includes("aarch64") && n.toLowerCase().endsWith(".dmg"))
      ?? names.find((n) => n.toLowerCase().endsWith(".dmg"))
      ?? null;
  }
  if (platform === "windows") {
    return names.find((n) => n.toLowerCase().includes("-setup.exe"))
      ?? names.find((n) => n.toLowerCase().endsWith(".exe"))
      ?? null;
  }
  if (platform === "linux") {
    return names.find((n) => n.toLowerCase().endsWith(".appimage"))
      ?? names.find((n) => n.toLowerCase().endsWith(".deb"))
      ?? null;
  }
  return null;
}

async function getLatestRelease(): Promise<{ tag: string; assets: Array<{ name: string }> } | null> {
  try {
    const res = await fetch(GITHUB_API_RELEASES, {
      headers: { "User-Agent": "nymiria-download" },
      next: { revalidate: 300 }, // cache 5 min
    });
    if (!res.ok) return null;
    const data = await res.json() as { tag_name: string; assets: Array<{ name: string }> };
    return { tag: data.tag_name, assets: data.assets };
  } catch {
    return null;
  }
}

async function logDownload(asset: string, version: string, platform: string, country: string, ua: string) {
  const date = new Date().toISOString().slice(0, 10);
  const ts = new Date().toISOString();
  await Promise.all([
    safeIncr("proxy_downloads:total"),
    safeIncr(`proxy_downloads:day:${date}`),
    safeIncr(`proxy_downloads:platform:${platform}`),
    safeIncr(`proxy_downloads:country:${country}`),
    safeIncr(`proxy_downloads:version:${version}`),
    safeLpush(
      "proxy_downloads:recent",
      JSON.stringify({ ts, asset, version, platform, country, ua }),
      500
    ),
  ]);
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const assetParam = params.get("asset");
  const platformParam = params.get("platform") as Platform | null;
  const tagParam = params.get("tag");

  const country = req.headers.get("x-vercel-ip-country") ?? "unknown";
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 200);

  // Mode 1: specific asset filename provided
  if (assetParam) {
    const version = tagParam ?? versionFromAsset(assetParam);
    const platform = platformFromAsset(assetParam);
    logDownload(assetParam, version, platform, country, ua).catch(() => {});
    return NextResponse.redirect(`${GITHUB_RELEASES_BASE}/${version}/${assetParam}`, 302);
  }

  // Mode 2: platform provided — fetch latest release and pick best asset
  if (platformParam && platformParam !== "other") {
    const release = await getLatestRelease();
    if (release) {
      const asset = pickAsset(release.assets, platformParam);
      if (asset) {
        logDownload(asset, release.tag, platformParam, country, ua).catch(() => {});
        return NextResponse.redirect(`${GITHUB_RELEASES_BASE}/${release.tag}/${asset}`, 302);
      }
    }
    // Fallback to releases page if GitHub is unreachable
    logDownload("unknown", "unknown", platformParam, country, ua).catch(() => {});
    return NextResponse.redirect(RELEASES_PAGE, 302);
  }

  // Mode 3: no params — log page click and redirect to releases page
  logDownload("releases-page", "unknown", "unknown", country, ua).catch(() => {});
  return NextResponse.redirect(RELEASES_PAGE, 302);
}
