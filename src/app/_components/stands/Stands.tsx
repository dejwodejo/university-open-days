import type { Stand } from "~/utils/types/Stand";
import { playfair_display } from "~/styles/fonts";
import StandCard from "~/app/_components/stands/StandCard";

export default function Stands({ stands }: { stands: Stand[] }) {
  return (
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
  );
}
