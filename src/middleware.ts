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
  matcher: ["/"],
};
