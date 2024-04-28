"use server";

import { EmailLoginSchema, type LoginFormState } from "~/lib/definitions";
import sendEmail from "~/actions/sendEmail";

export default async function loginHandler(
  login: LoginFormState,
  formData: FormData,
) {
  const validatedLoginForm = EmailLoginSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedLoginForm.success) {
    return {
      errors: validatedLoginForm.error.flatten().fieldErrors,
    };
  }

  const authCode = generateSixDigits();

  const emailSent = await sendEmail(validatedLoginForm.data.email, authCode);

  console.log(emailSent);
}

function generateSixDigits(): string {
  return (Math.floor(Math.random() * 900000) + 100000).toString();
}
