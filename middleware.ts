import { NextRequest, NextResponse } from "next/server";

// Paths that are always public — no password required
const PUBLIC_PATHS = ["/comingsoon", "/api/waitlist", "/api/ping"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let public routes through unconditionally
  if (isPublic(pathname)) return NextResponse.next();

  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [, pass] = decoded.split(":");
      if (pass === password) return NextResponse.next();
    }
  }

  return new NextResponse("Protected — contact hi@nymiria.com for access.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Nymiria"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$).*)"],
};
