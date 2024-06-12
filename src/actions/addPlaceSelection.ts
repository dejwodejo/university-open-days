"use server"

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { floors, rooms } from "~/server/db/schema";

export default async function addPlaceSelection(prevState: any, formData: FormData) {
    const selectedFloors = formData.getAll("floors[]");

    if (!selectedFloors || !Array.isArray(selectedFloors)) {
        return { message: "Invalid floor ids." };
    }

    const selectedFloorIds = selectedFloors
        .map(floor => parseInt(floor as string, 10))
        .filter(id => !isNaN(id));

    if (selectedFloorIds.length === 0) {
        return { message: "Invalid floor ids." };
    }

    await deselectFloors();

    for (let floorId of selectedFloorIds) {
        await db.update(floors).set({ isSelected: true }).where(eq(floors.id, floorId))
    }

    return { message: 'Zaaktualizowano piętra' };
}

async function deselectFloors() {
    const allIds: { id: number }[] = await db.select({ id: floors.id }).from(floors);

    for (let { id } of allIds) {
        await db.update(floors).set({ isSelected: false }).where(eq(floors.id, id))
    }
}