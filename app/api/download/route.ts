import { NextRequest, NextResponse } from "next/server";
import { safeIncr, safeLpush } from "../../../lib/redis";

export const runtime = "nodejs";

const GITHUB_RELEASES_BASE =
  "https://github.com/adaline-hub/nymiria-updates/releases/download";

// Map asset filename → platform label
function detectPlatform(name: string): string {
  const n = name.toLowerCase();
  if (n.includes(".dmg") || n.includes("aarch64") || n.endsWith(".app.tar.gz")) return "mac";
  if (n.includes("-setup.exe") || n.endsWith(".exe")) return "windows";
  if (n.endsWith(".appimage") || n.endsWith(".deb")) return "linux";
  return "other";
}

// Extract semver tag from asset name, e.g. "Nymiria_1.0.27_x64-setup.exe" → "v1.0.27"
function detectVersion(asset: string): string {
  const m = asset.match(/_(\d+\.\d+\.\d+)[_.-]/);
  return m ? `v${m[1]}` : "unknown";
}

export async function GET(req: NextRequest) {
  const asset = req.nextUrl.searchParams.get("asset");
  const tag = req.nextUrl.searchParams.get("tag"); // optional explicit tag override

  if (!asset) {
    return NextResponse.json({ error: "missing asset param" }, { status: 400 });
  }

  const version = tag ?? detectVersion(asset);
  const platform = detectPlatform(asset);
  const country = req.headers.get("x-vercel-ip-country") ?? "unknown";
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 200);
  const date = new Date().toISOString().slice(0, 10);
  const ts = new Date().toISOString();

  // Fire-and-forget logging — never block the redirect
  const log = async () => {
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
  };
  log().catch(() => {});

  const redirect = `${GITHUB_RELEASES_BASE}/${version}/${asset}`;
  return NextResponse.redirect(redirect, 302);
}
