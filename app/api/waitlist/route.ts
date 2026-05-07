import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // TODO: wire to email service (Loops, Resend, Mailchimp, etc.)
  // For now, log and return success so the form works end-to-end.
  console.log("[waitlist]", email);

  return NextResponse.json({ ok: true });
}
