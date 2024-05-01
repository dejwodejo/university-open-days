"use server";

import { db } from "~/server/db";
import UserDetails from "~/app/_components/form/UserDetails";
import { type Region } from "~/lib/definitions";

export default async function FormPage() {
  const addresses: Region[] = await db.query.regions.findMany({
    with: {
      cities: {
        with: {
          schools: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <h2 className="text-lg text-gray-800">
          Zanim przejdziesz dalej, proszę wypełnij dodatkowe informacje!
        </h2>
      </div>
      <p className="mb-6 text-gray-600">
        To pomoże nam dowiedzieć się skąd są uczniowe i nauczyciele, którzy
        interesują się naszą uczelnią.
      </p>
      <UserDetails addresses={addresses} />
    </div>
  );
}
