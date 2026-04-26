import { NextRequest, NextResponse } from "next/server";
import { safeIncr, safeGet, safeSet } from "../../../lib/redis";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as {
      event?: string;
      version?: string;
      os?: string;
      installId?: string;
    };

    const { event, version, os, installId } = body;
    if (!event || !["install", "launch"].includes(event)) {
      return NextResponse.json({ error: "invalid event" }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const safeVersion = (version ?? "unknown").replace(/[^a-z0-9._-]/gi, "");
    const safeOs = (os ?? "unknown").replace(/[^a-z0-9._-]/gi, "");

    // Track unique installs via installId
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // always return 200 to not break the app
  }
}
