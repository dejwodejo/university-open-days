"use server";

import { type AuthCode, EmailLoginSchema } from "~/lib/definitions";
import {
  createContactAuthCode,
  getContactAuthCode,
} from "~/actions/authCodesHandler";
import { redirect } from "next/navigation";
import sendEmail from "~/actions/sendEmail";

export default async function loginHandler(prevState: any, formData: FormData) {
  const validatedLoginForm = EmailLoginSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedLoginForm.success)
    return { errors: validatedLoginForm.error.flatten().fieldErrors };
  const { email } = validatedLoginForm.data;

  const authCodeForContact: AuthCode | null = await getContactAuthCode(email);

  if (authCodeForContact) return { errors: "You have been sent an email." };

  const authCode = generateSixDigits();

  await sendAuthCodeViaEmail(email, authCode);

  return redirect("/auth?email=" + email);
}

async function sendAuthCodeViaEmail(email: string, authCode: string) {
  await createContactAuthCode(email, authCode);

  return sendEmail(email, authCode);
}

function generateSixDigits(): string {
  return (Math.floor(Math.random() * 900000) + 100000).toString();
}
