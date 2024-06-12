"use server";

import { cookies } from "next/headers";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { type NextRequest, NextResponse } from "next/server";

interface UserSession {
  contact: string;
  expires: Date;
}

const secretKey = "MOVE_THIS_SHIT_TO_ENV";
const key = new TextEncoder().encode(secretKey);

const MILLISECONDS = 1000;
const SECONDS = 60;
const MINUTES = 10;

export async function encrypt(payload: UserSession): Promise<string> {
  return new SignJWT({
    contact: payload.contact,
    expires: payload.expires.toISOString(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function assignSessionToken(contact: string) {
  const expires = new Date(Date.now() + MINUTES * SECONDS * MILLISECONDS);
  const session = await encrypt({ contact, expires });

  cookies().set("contact", contact);
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  console.log(parsed);
  parsed.expires = new Date(Date.now() + 10 * 1000);

  const res = NextResponse.next();
  res.cookies.set("session", await encrypt(parsed), {
    httpOnly: true,
    expires: parsed.expires as Date,
  });
  return res;
}
