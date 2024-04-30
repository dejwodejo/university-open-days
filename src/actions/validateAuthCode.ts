"use server";

import {
  deleteContactAuthCode,
  getContactAuthCode,
} from "~/actions/authCodesHandler";
import { redirect } from "next/navigation";
import { assignSessionToken } from "~/lib";

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

    redirect("/");
  }

  return redirect("/login");
}
