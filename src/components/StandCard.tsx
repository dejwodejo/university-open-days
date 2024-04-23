import { playfair_display } from "~/styles/fonts";

interface LectureCardProps {
  name: string;
  description: string;
  location: string;
  imageUrl: string;
}

export default function StandCard({
  name,
  description,
  location,
  imageUrl,
}: LectureCardProps) {
  return (
    <div className="mb-10 flex items-center">
      <div className="flex-grow pr-10">
        <h3 className={`text-3xl font-bold ${playfair_display.className}`}>
          {name}
        </h3>
        <p className="text-sm">{description}</p>
        <div className={"my-4 flex items-center justify-center"}>
          <img
            src={"/map-pin-icon.png"}
            alt={"Gdzie jest stanowisko?"}
            className={"mr-2 size-6"}
          />
          <div className={"flex w-full items-center justify-between"}>
            <p className="text-base">{location}</p>
            <p className="gray-300 rounded border-2 px-9 py-2 text-base shadow-lg hover:border-gray-400 hover:bg-gray-300">
              {"Zobacz na mapie"}
            </p>
          </div>
        </div>
      </div>
      <img src={imageUrl} alt="Logo" className="ml-4 h-56 w-56" />
    </div>
  );
}
