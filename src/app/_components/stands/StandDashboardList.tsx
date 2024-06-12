"use server";

import { db } from "~/server/db";
import DeleteStandBtn from "../actionComponents/DeleteStandBtn";

export default async function StandDashboardList() {
  const addedStands = await db.query.stands.findMany({
    with: {
      floor: {
        with: {
          building: true,
        },
      },
    },
  });

  return (
    <div className="w-full border-b border-t">
      {addedStands.map(
        ({
          id,
          name: standName,
          location,
          floor: {
            label,
            building: { campusName, name: buildingName },
          },
        }) => (
          <div
            key={id}
            className="flex w-full flex-row items-center justify-between border-b border-t py-3 last:border-b-0"
          >
            <div className="flex w-[80%] flex-col">
              <p>{standName}</p>
              <p>{`${campusName}, ${buildingName}. ${label}, ${location}`}</p>
            </div>
            <div className="w-[20%]">
              <DeleteStandBtn idToDelete={id} />
            </div>
          </div>
        ),
      )}
    </div>
  );
}
