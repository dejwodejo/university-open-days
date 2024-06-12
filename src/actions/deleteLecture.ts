"use server"

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { lectures } from "~/server/db/schema";

export default async function deleteLecture(prevState: any, formData: FormData) {
    const idToDelete = formData.get("idToDelete");

    if (!idToDelete) return { message: "Błąd serwera." }

    await db.delete(lectures).where(eq(lectures.id, parseInt(idToDelete as string, 10)))
};