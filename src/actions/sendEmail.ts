"use server";

import { Resend } from "resend";
import AuthEmailTemplate from "~/components/AuthEmailTemplate";

export default async function sendEmail(email: string, authCode: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Dni Otwarte UZ <dni-otwarte-uz@mathinsight.xyz>",
      to: email,
      subject: "Kod autoryzacyjny | Drzwi Otwarte UZ",
      react: AuthEmailTemplate({ authCode }),
    });

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      error: (error as Error).message,
      success: false,
    };
  }
}
