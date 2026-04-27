import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const normalized = email.trim().toLowerCase();
    const timestamp = Date.now();

    // Store in a sorted set (score = timestamp) for ordered retrieval
    await kv.zadd('waitlist', { score: timestamp, member: normalized });
    // Also store signup time per email for detail lookup
    await kv.hset('waitlist:meta', { [normalized]: timestamp });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[waitlist]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
