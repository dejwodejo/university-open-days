"use server";

import { cookies } from "next/headers";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { type NextRequest, NextResponse } from "next/server";

const secretKey = "MOVE_THIS_SHIT_TO_ENV";
const key = new TextEncoder().encode(secretKey);

interface UserSession {
  user: {
    email?: string;
    phoneNr?: string;
  };
  expires: Date;
}

export async function encrypt(payload: UserSession): Promise<string> {
  return new SignJWT({
    user: payload.user,
    expires: payload.expires.toISOString(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const email = formData.get("email");
  const phoneNr = formData.get("phoneNr");

  let user;

  if (typeof email === "string") user = { email };
  else if (typeof phoneNr === "string") user = { phoneNr };
  else throw new Error("Contact wasn't provided");

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

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
