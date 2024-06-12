"use server";

import { LectureSchema } from "~/lib/definitions"
import { db } from "~/server/db";
import { lectures } from "~/server/db/schema";

export default async function addLecture(prevState: any, formData: FormData) {
    const validatedLectureForm = LectureSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        start: formData.get("start"),
        end: formData.get("end"),
        authors: formData.get("authors"),
        roomId: formData.get("roomId")
    })

    if (!validatedLectureForm.success)
        return { errors: validatedLectureForm.error.issues }

    const { title, description, type, start, end, authors, roomId } = validatedLectureForm.data;

    await db.insert(lectures).values({ title, description, type, start: new Date(start), end: new Date(end), authors, roomId })

    return { message: "Dodano wykład." }
}
