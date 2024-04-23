import { db } from "~/server/db";
import { playfair_display } from "~/styles/fonts";
import StandCard from "~/components/StandCard";
import LectureCard from "~/components/LectureCard";

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
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h2
            className={`my-8 text-5xl font-semibold ${playfair_display.className}`}
          >
            {"Nadchodzące wykłady i warsztaty"}
          </h2>
          <div className="flex w-full items-start justify-between gap-7">
            <div className="flex w-1/2 flex-col gap-4">
              {lectures
                .slice(0, Math.ceil(lectures.length / 2))
                .map(
                  ({
                    title,
                    description,
                    type,
                    start,
                    end,
                    authors,
                    room: { floor, number },
                  }) => (
                    <LectureCard
                      key={`lecture_${title}`}
                      type={type}
                      title={title}
                      authors={authors}
                      description={description}
                      start={start}
                      end={end}
                      floor={floor}
                      number={number}
                    />
                  ),
                )}
            </div>
            <div className="flex w-1/2 flex-col gap-4">
              {lectures
                .slice(Math.ceil(lectures.length / 2))
                .map(
                  ({
                    title,
                    description,
                    type,
                    start,
                    end,
                    authors,
                    room: { floor, number },
                  }) => (
                    <LectureCard
                      key={`lecture_${title}`}
                      type={type}
                      title={title}
                      authors={authors}
                      description={description}
                      start={start}
                      end={end}
                      floor={floor}
                      number={number}
                    />
                  ),
                )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2
            className={`mb-4 text-5xl font-semibold ${playfair_display.className}`}
          >
            {"Stanowiska na wydarzeniu"}
          </h2>
          {stands.map(({ name, description, location, imageUrl }) => (
            <StandCard
              key={`stand_${name}`}
              name={name}
              description={description}
              location={location}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
