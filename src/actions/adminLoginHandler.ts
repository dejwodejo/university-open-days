'use server'

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import { divisions } from "~/server/db/schema";

export default async function adminLoginHandler(prevState: any, formData: FormData) {
    const division = formData.get("division") as string;
    const password = formData.get("password") as string;

    const selectedDivision = await db.select().from(divisions).where(eq(divisions.value, division)).limit(1)

    if (!selectedDivision[0]) return { message: "Couldn't find selected division." }

    if (selectedDivision[0].password !== password) {
        console.log("what")
        return { message: "Invalid password." }
    }

    cookies().set("division", division)
    return redirect("/admin/dashboard");
}