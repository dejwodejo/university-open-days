"use server";

import { LectureSchema } from "~/lib/definitions"
import { db } from "~/server/db";
import { lectures, pageDetails } from "~/server/db/schema";

export default async function addLecture(prevState: any, formData: FormData) {
    const dateOfEventObj = await db.select({ date: pageDetails.date }).from(pageDetails);
    if (!dateOfEventObj[0]?.date) return { message: "Nie można zapisać wykładu, jeśli wcześniej nie wybrano sali." }

    const dateOfEvent = dateOfEventObj[0].date;

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

    const [startHH, startMM] = start.split(':').map(Number);
    const [endHH, endMM] = end.split(':').map(Number);

    const startDate = dateOfEvent;
    startDate.setUTCHours(startHH as number);
    startDate.setUTCMinutes(startMM as number);

    const endDate = dateOfEvent;
    endDate.setUTCHours(endHH as number);
    endDate.setUTCMinutes(endMM as number);

    await db.insert(lectures).values({ title, description, type, start: startDate, end: endDate, authors, roomId: parseInt(roomId, 10) })

    return { message: "Dodano wykład." }
}
