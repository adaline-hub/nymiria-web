import { NextRequest, NextResponse } from "next/server";
import { safeGet, isConfigured } from "../../../lib/redis";

export const runtime = "nodejs";

const STATS_TOKEN = process.env.METRICS_TOKEN ?? process.env.SITE_PASSWORD;

async function getRedisInt(key: string): Promise<number> {
  const v = await safeGet(key);
  return v ? parseInt(v, 10) : 0;
}

async function getGitHubDownloads() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/adaline-hub/nymiria-updates/releases?per_page=20",
      { headers: { "User-Agent": "nymiria-metrics" }, cache: "no-store" }
    );
    if (!res.ok) return null;
    const releases = await res.json() as Array<{
      tag_name: string;
      published_at: string;
      assets: Array<{ name: string; download_count: number }>;
    }>;
    const byVersion: Record<string, { version: string; date: string; total: number; platforms: Record<string, number> }> = {};
    let grandTotal = 0;
    for (const release of releases) {
      const v = release.tag_name;
      let vTotal = 0;
      const platforms: Record<string, number> = {};
      for (const asset of release.assets) {
        const n = asset.name.toLowerCase();
        if (n.endsWith(".sig") || n.endsWith(".json")) continue;
        vTotal += asset.download_count;
        grandTotal += asset.download_count;
        const platform = n.includes("dmg") || n.includes("aarch64") ? "mac"
          : n.includes("exe") || n.includes("setup") ? "windows"
          : n.includes("appimage") || n.includes("deb") ? "linux"
          : "other";
        platforms[platform] = (platforms[platform] ?? 0) + asset.download_count;
      }
      byVersion[v] = { version: v, date: release.published_at.slice(0, 10), total: vTotal, platforms };
    }
    return { grandTotal, byVersion };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  // Auth check
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!STATS_TOKEN || token !== STATS_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [github, installs, launches] = await Promise.all([
    getGitHubDownloads(),
    getRedisInt("installs:total"),
    getRedisInt("launches:total"),
  ]);

  // Last 14 days
  const days: Array<{ date: string; installs: number; launches: number }> = [];
  const today = new Date();
  await Promise.all(
    Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      return d.toISOString().slice(0, 10);
    }).map(async (date) => {
      const [di, dl] = await Promise.all([
        getRedisInt(`installs:day:${date}`),
        getRedisInt(`launches:day:${date}`),
      ]);
      days.push({ date, installs: di, launches: dl });
    })
  );
  days.sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    storage: isConfigured() ? "connected" : "not configured",
    installs: { total: installs },
    launches: { total: launches },
    last14Days: days,
    downloads: github,
  });
}
