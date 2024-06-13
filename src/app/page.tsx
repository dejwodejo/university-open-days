import { db } from "~/server/db";
import Link from "next/link";
import Lectures from "~/app/_components/lectures/Lectures";
import Stands from "~/app/_components/stands/Stands";
import EventMaps from "./_components/map/EventMaps";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [lectures, stands] = await Promise.all([
    db.query.lectures.findMany({
      with: {
        room: true,
      },
    }),
    db.query.stands.findMany(),
  ]);

  return (
    <main>
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-row">
          <Link href={"https://wmie.uz.zgora.pl/"}>
            <a>Przejdź do strony organizatora</a>
          </Link>
          <Link href={"https://rekrutacja.uz.zgora.pl/"}>
            <a>Przejdź do strony rekrutacji</a>
          </Link>
        </div>
        <Lectures lectures={lectures} />
        {/* <Stands stands={stands} /> */}
        <EventMaps />
      </div>
    </main>
  );
}
