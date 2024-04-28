import { type NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "~/lib";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (session) {
    await updateSession(request);

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!login|_next/static|_next/image|favicon.ico).*)",
  ],
};
