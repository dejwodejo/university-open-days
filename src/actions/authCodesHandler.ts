"use server";

import { db } from "~/server/db";
import { authCodes } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { type AuthCode } from "~/lib/definitions";

export async function createContactAuthCode(contact: string, authCode: string) {
  return db.insert(authCodes).values({ authCode, contact });
}

export async function getContactAuthCode(
  contact: string,
): Promise<AuthCode | null> {
  /* This function retrieves an authentication code for a given contact if it was created within the last five minutes.
  If the authentication code is older than five minutes, the function deletes it and returns null.
  The function also returns null if there is no existing authentication code for the contact. */

  const [authCodeForContact] = await db
    .select()
    .from(authCodes)
    .where(eq(authCodes.contact, contact));

  if (!authCodeForContact) return null;

  const createdInLast2Minutes = wasCreatedInLast2Minutes(
    authCodeForContact.createdAt,
  );

  if (!createdInLast2Minutes) {
    await deleteContactAuthCode(contact);
    return null;
  }

  return authCodeForContact;
}

export async function deleteContactAuthCode(contact: string) {
  return db.delete(authCodes).where(eq(authCodes.contact, contact));
}

function wasCreatedInLast2Minutes(createdAt: Date): boolean {
  /** Checks if a given date occurred within the last 2 minutes.
   * @param {Date} createdAt - The date to check.
   * @returns {boolean} Returns true if the date is within the last 2 minutes from the current time, otherwise returns false.
   */

  const now = new Date();
  const twoMinAgo = new Date(now.getTime() - 2 * 60 * 1000);
  return createdAt >= twoMinAgo;
}
