import { playfair_display } from "~/styles/fonts";

interface LectureCardProps {
  type: string;
  title: string;
  authors: string;
  description: string;
  start: Date;
  end: Date;
}

export default function LectureCard({
  type,
  title,
  authors,
  description,
  start,
  end,
}: LectureCardProps) {
  return (
    <div className="relative mb-4 flex min-w-[400px] flex-col rounded-2xl border-2 border-black p-4">
      <img
        src={
          type === "traditional" ? "/lecture-icon.png" : "/workshop-icon.png"
        }
        className={
          "absolute left-0 top-0 z-[2] size-10 translate-x-[-50%] translate-y-[-50%] bg-gray-100"
        }
      ></img>
      <div className="mb-2 flex flex-col items-baseline justify-between">
        <h3 className={`text-3xl font-bold ${playfair_display.className}`}>
          {title}
        </h3>
        <h4 className={`text-2xl font-semibold ${playfair_display.className}`}>
          {authors}
        </h4>
      </div>
      <p className="text-sm">{description}</p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="my-2 flex items-center">
          <img src={"/clock-icon.png"} className={"mr-2 size-6"} />
          <p>
            {"Od " +
              start.toLocaleDateString() +
              " do " +
              end.toLocaleDateString()}
          </p>
        </div>
        <div className="my-2 flex items-center">
          <img src={"/map-pin-icon.png"} className={"mr-2 size-6"} />
          <p>{"Piętro " + 2 + " sala " + 2137}</p>
        </div>
      </div>
    </div>
  );
}
