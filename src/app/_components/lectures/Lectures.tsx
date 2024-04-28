import type Lecture from "~/utils/types/Lecture";
import { playfair_display } from "~/styles/fonts";
import LectureCard from "~/app/_components/lectures/LectureCard";

export default function Lectures({ lectures }: { lectures: Lecture[] }) {
  return (
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
  );
}
