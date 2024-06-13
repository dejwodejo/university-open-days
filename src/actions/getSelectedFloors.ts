import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { floors } from "~/server/db/schema";

export async function getSelectedFloors() {
    return db.query.floors.findMany({
        where: eq(floors.isSelected, true),
        with: {
            rooms: true,
            building: true,
        }
    })
}