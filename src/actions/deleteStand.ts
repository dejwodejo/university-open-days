"use server"
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { stands } from "~/server/db/schema";

export default async function deleteStand(prevState: any, formData: FormData) {
    const idToDelete = formData.get("idToDelete");

    if (!idToDelete) return { message: "Błąd serwera." }

    await db.delete(stands).where(eq(stands.id, parseInt(idToDelete as string, 10)));
}