"use server";

import { db } from "~/server/db";
import { lectures } from "~/server/db/schema";
import { format } from "date-fns";
import DeleteLectureBtn from "../actionComponents/DeleteLectureBtn";

export default async function LectureDashboardList() {
  const addedLectures = await db.select().from(lectures);

  return (
    <div className="w-full border-b border-t">
      {addedLectures.map(({ id, title, authors, start, end }) => (
        <div
          key={id}
          className="flex w-full flex-row items-center justify-between border-b border-t py-3 last:border-b-0"
        >
          <div className="flex w-[80%] flex-col">
            <p>{title}</p>
            <p>{authors}</p>
            <p>{`Trwający od ${format(start, "yyyy-MM-dd HH:mm")} do ${format(end, "yyyy-MM-dd HH:mm")}`}</p>
          </div>
          <div className="w-[20%]">
            <DeleteLectureBtn idToDelete={id} />
          </div>
        </div>
      ))}
    </div>
  );
}
