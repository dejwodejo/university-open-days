"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { floors } from "~/server/db/schema";

export default async function EventMaps() {
  const availibleFloors = await db.query.floors.findMany({
    with: {
      stands: true,
    },
    where: eq(floors.isSelected, true),
  });

  return (
    <div>
      <h1>{"Mapa wydarzenia"}</h1>
      <div className="flex flex-col">
        {availibleFloors.map(({ jsxFloorShape, stands }) => (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: jsxFloorShape ? jsxFloorShape : "",
              }}
            ></div>
            <h3>{"Stanowiska na tym piętrze:"}</h3>
            <ul>
              {stands.map(({ name, location }) => (
                <li>{`${name}, ${location}`}</li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </div>
  );
}
