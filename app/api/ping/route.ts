import { NextRequest, NextResponse } from "next/server";
import { safeIncr, safeGet, safeSet } from "../../../lib/redis";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter.
//
// Uses a per-IP sliding window counter. Limits are conservative so the
// endpoint stays useful for genuine telemetry while blocking abuse.
//
// Default: 60 requests per minute per IP. Configure via env:
//   PING_RATE_LIMIT  — max requests per window (default: 60)
//   PING_WINDOW_SECS — window size in seconds (default: 60)
// ---------------------------------------------------------------------------

const RATE_LIMIT = parseInt(process.env.PING_RATE_LIMIT ?? "60", 10);
const WINDOW_SECS = parseInt(process.env.PING_WINDOW_SECS ?? "60", 10);

interface WindowEntry {
  count: number;
  resetAt: number; // Unix ms
}

/** In-memory store keyed by IP. Persists across requests in the same worker. */
const store = new Map<string, WindowEntry>();

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

function rateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(ip);

  // First request in window — initialise it.
  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_SECS * 1000 });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetAt: now + WINDOW_SECS * 1000 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - entry.count, resetAt: entry.resetAt };
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const { allowed, remaining, resetAt } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "rate limited", retryAfterMs: resetAt - Date.now() },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.floor(resetAt / 1000)),
        },
      },
    );
  }

  try {
    const body = (await req.json().catch(() => ({}))) as {
      event?: string;
      version?: string;
      os?: string;
      installId?: string;
    };

    const { event, version, os, installId } = body;
    if (!event || !["install", "launch"].includes(event)) {
      return NextResponse.json(
        { error: "invalid event" },
        { status: 400, headers: rateLimitHeaders(remaining, resetAt) },
      );
    }

    const today = new Date().toISOString().slice(0, 10);
    const safeVersion = (version ?? "unknown").replace(/[^a-z0-9._-]/gi, "");
    const safeOs = (os ?? "unknown").replace(/[^a-z0-9._-]/gi, "");

    if (event === "install" && installId) {
      const safeId = installId.replace(/[^a-z0-9-]/gi, "").slice(0, 64);
      const seen = await safeGet(`seen:${safeId}`);
      if (!seen) {
        await safeSet(`seen:${safeId}`, "1");
        await safeIncr("installs:total");
        await safeIncr(`installs:version:${safeVersion}`);
        await safeIncr(`installs:os:${safeOs}`);
        await safeIncr(`installs:day:${today}`);
      }
    }

    if (event === "launch") {
      await safeIncr("launches:total");
      await safeIncr(`launches:version:${safeVersion}`);
      await safeIncr(`launches:os:${safeOs}`);
      await safeIncr(`launches:day:${today}`);
    }

    return NextResponse.json(
      { ok: true },
      { headers: rateLimitHeaders(remaining, resetAt) },
    );
  } catch {
    return NextResponse.json(
      { ok: true },
      { headers: rateLimitHeaders(remaining, resetAt) },
    );
  }
}

function rateLimitHeaders(remaining: number, resetAt: number): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.floor(resetAt / 1000)),
  };
}
