"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { forms, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { UserTypes } from "~/lib/definitions";

export async function addUserDetails(prevState: any, formData: FormData) {
  const contact: string | undefined = cookies().get("contact")?.value;
  if (!contact) return redirect("/");

  const schoolId: FormDataEntryValue | null = formData.get("school");
  if (!schoolId || typeof schoolId !== "string") return redirect("/");

  if (!formData.get("userType")) return redirect("/");
  const userType = formData.get("userType") as UserTypes;

  const [user] = await db.select().from(users).where(eq(users.email, contact));

  if (!user) return redirect("/login");

  await db.insert(forms).values({
    userId: user.id,
    type: userType === UserTypes.TEACHER ? "teacher" : "student",
    schoolId: Number(schoolId),
  });

  redirect("/");
}
