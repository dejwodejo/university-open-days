"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { pageDetails } from "~/server/db/schema";

export async function modifyMainSettings(prevState: any, formData: FormData) {
    const title = formData.get('title');
    const date = formData.get('date');
    const organizer = formData.get('organizer');

    const holderRowId = 1;

    if (title) {
        await db.update(pageDetails).set({ title: title as string }).where(eq(pageDetails.id, holderRowId))
    } else if (date) {
        await db.update(pageDetails).set({ date: new Date(date as string) }).where(eq(pageDetails.id, holderRowId))
    } else if (organizer) {
        await db.update(pageDetails).set({ organizer: organizer === "wmie" ? "Wydział Matematyki, Informatyki i Ekonometrii" : null }).where(eq(pageDetails.id, holderRowId))
    } else return { message: "Błąd serwera." }
}
