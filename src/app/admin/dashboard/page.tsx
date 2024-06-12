"use server";

import { getSelectedFloors } from "~/actions/getSelectedFloors";
import DeleteAllEventSettings from "~/app/_components/actionComponents/DeleteAllEventSettings";
import { AddLectureForm } from "~/app/_components/dashboard/AddLectureForm";
import { AddStandForm } from "~/app/_components/dashboard/AddStandForm";
import MainEventSettingsForm from "~/app/_components/dashboard/mainSettings/MainEventSettingsForm";
import PlaceSelectionForm from "~/app/_components/dashboard/PlaceSelectionForm";
import LectureDashboardList from "~/app/_components/lectures/LectureDashboardList";
import StandDashboardList from "~/app/_components/stands/StandDashboardList";
import { db } from "~/server/db";
import { divisions, pageDetails } from "~/server/db/schema";
import IMainSettings from "~/utils/types/MainSettings";

export default async function AdminDashboardPage() {
  const organizers = await db
    .select({
      name: divisions.name,
      value: divisions.value,
    })
    .from(divisions);

  const places = await db.query.campuses.findMany({
    with: {
      buildings: {
        with: {
          floors: {
            with: {
              rooms: true,
            },
          },
        },
      },
    },
  });

  const sortedPlaces = places.map((campus) => {
    const campusCopy = { ...campus };

    campusCopy.buildings = campusCopy.buildings.map((building) => {
      const buildingCopy = { ...building };

      buildingCopy.floors = buildingCopy.floors.sort((a, b) => {
        const levelA =
          a.level === null || a.level === undefined ? Infinity : a.level;
        const levelB =
          b.level === null || b.level === undefined ? Infinity : b.level;

        return levelA - levelB;
      });

      return buildingCopy;
    });

    return campusCopy;
  });

  const [mainEventSettings] = await db.select().from(pageDetails);
  const settings: IMainSettings = mainEventSettings
    ? mainEventSettings.date &&
      mainEventSettings.title &&
      mainEventSettings.organizer
      ? {
          date: mainEventSettings.date.toLocaleDateString("pl-PL"),
          title: mainEventSettings.title,
          organizer: mainEventSettings.organizer,
        }
      : {
          date: "NIE USTAWIONO",
          title: "NIE USTAWIONO",
          organizer: "NIE USTAWIONO",
        }
    : {
        date: "NIE USTAWIONO",
        title: "NIE USTAWIONO",
        organizer: "NIE USTAWIONO",
      };

  const selectedFloors = await getSelectedFloors();
  const availibleRooms = selectedFloors.map((floor) => floor.rooms).flat();

  return (
    <div className="container mx-auto px-4">
      {/* <div className="my-4 rounded bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold">
          {"Usuń WSZYSTKIE dotychczasowe informacje o wydarzeniu"}
        </h2>
        <p className="text-gray-600">
          {
            "Klikając przycisk poniżej, usuniesz wszystkie informacje o wydarzeniu, w tym:"
          }
        </p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>{"Tytuł i datę wydarzenia"}</li>
          <li>{"Wszystkie wykłady i wydarzenia"}</li>
          <li>{"Wszystkie stanowiska"}</li>
          <li>{"Dodaną mapę wydarzenia"}</li>
        </ul>
        <DeleteAllEventSettings />
      </div> */}

      <div className="my-4 rounded bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold">
          {"Dodaj główne ustawienia wydarzenia"}
        </h2>

        <MainEventSettingsForm
          currentSettings={{
            title: mainEventSettings?.title,
            date: mainEventSettings?.date,
            organizer: mainEventSettings?.organizer,
          }}
          organizators={organizers}
        />
      </div>

      <div className="my-4 rounded bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold">{"Dodaj miejsce wydarzenia"}</h2>

        <PlaceSelectionForm campuses={sortedPlaces} />
      </div>

      <div className="my-4 rounded bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold">{"Dodaj wykład"}</h2>

        <AddLectureForm rooms={availibleRooms} eventDate={settings.date} />
        <LectureDashboardList />
      </div>

      <div className="my-4 rounded bg-white p-4 shadow-md">
        <h2 className="text-lg font-semibold">{"Dodaj stanowisko"}</h2>

        <AddStandForm floors={selectedFloors} />
        <StandDashboardList />
      </div>
    </div>
  );
}
