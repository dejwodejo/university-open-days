"use server";

import { StandSchema } from "~/lib/definitions"
import { db } from "~/server/db";
import { stands } from "~/server/db/schema";

export default async function addStand(prevState: any, formData: FormData) {
    const validatedStandForm = StandSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        type: formData.get("type"),
        location: formData.get("location"),
        imageUrl: formData.get("imageUrl"),
        floorId: formData.get("floorId")
    })

    if (!validatedStandForm.success)
        return { errors: validatedStandForm.error.issues }

    const { name, description, type, imageUrl, location, floorId } = validatedStandForm.data;

    await db.insert(stands).values({ name, description, type, location, imageUrl, floorId })

    return { message: "Dodano stoisko." }
}
