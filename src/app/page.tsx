import { db } from "~/server/db";
import Lectures from "~/app/_components/lectures/Lectures";
import Stands from "~/app/_components/stands/Stands";

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
        <Lectures lectures={lectures} />
        <Stands stands={stands} />
      </div>
    </main>
  );
}
