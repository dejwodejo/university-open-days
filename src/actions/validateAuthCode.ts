"use server";

import {
  deleteContactAuthCode,
  getContactAuthCode,
} from "~/actions/authCodesHandler";
import { redirect } from "next/navigation";
import { assignSessionToken } from "~/lib";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { forms, users } from "~/server/db/schema";
import { cookies } from "next/headers";

interface SafePrevState {
  message?: string;
}

export async function validateAuthCode(prevState: any, formData: FormData) {
  const { message: email } = prevState as SafePrevState;
  const userAuthCode = formData.get("userAuthCode");

  if (!email || !userAuthCode) redirect("/login");

  const authCode = await getContactAuthCode(email);

  if (!authCode) return redirect("/login");

  if (userAuthCode === authCode.authCode) {
    await assignSessionToken(email);
    await deleteContactAuthCode(email);
    cookies().set("email", email);

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      await db.insert(users).values({ email });
      return redirect("/form");
    }

    const form = await db.query.forms.findFirst({
      where: eq(forms.userId, user.id),
    });

    if (!form) {
      return redirect("/form");
    }

    redirect("/");
  }

  return redirect("/login");
}
