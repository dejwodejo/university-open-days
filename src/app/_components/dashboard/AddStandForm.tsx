"use client";

import { useFormState } from "react-dom";
import { ChangeEvent, useState } from "react";
import addStand from "~/actions/addStand";

interface StandFormProps {
  floors: {
    id: number;
    label: string | null;
    level: number | null;
    isSelected: boolean;
    buildingId: number;
  }[];
}

export function AddStandForm({ floors }: StandFormProps) {
  const [selectedStandType, setSelectedStandType] = useState<string | null>(
    null,
  );
  const handleStandTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStandType(event.target.value);
  };

  const [state, action] = useFormState(addStand, null);

  return (
    <form action={action} className="flex flex-col items-center justify-center">
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Nazwa stoiska"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      />

      <textarea
        id="description"
        name="description"
        placeholder="Opis stoiska"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        maxLength={255}
        required
      />

      <select
        name="type"
        className="form-select my-2 w-[100%] rounded-2xl border-2 p-2"
        onChange={handleStandTypeChange}
        required
      >
        <option value="" disabled={!!selectedStandType}>
          {"Wybierz typ stoiska"}
        </option>
        ["faculty", "student_organization", "company", "other"]
        <option value="faculty">{"Wydział uczelni"}</option>
        <option value="student_organization">{"Organizacja studencka"}</option>
        <option value="company">{"Firma"}</option>
        <option value="other">{"Inny"}</option>
      </select>

      <input
        id="imageUrl"
        name="imageUrl"
        type="url"
        placeholder="URL obrazu"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        maxLength={1000}
        required
      />

      <select
        name="floorId"
        className="form-select my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      >
        <option value="">{"Wybierz piętro"}</option>
        {floors.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>

      <input
        id="location"
        name="location"
        type="text"
        placeholder="Lokalizacja (słownie, np. Obok sali 207, Obok toalet)"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      />

      <p>
        {state?.errors?.map((issue) => (
          <p aria-live="polite">- {issue.message}</p>
        ))}
      </p>
      <button
        type="submit"
        className="m-3 w-full rounded-2xl border-2 p-2 shadow-sm duration-300 hover:bg-gray-300"
      >
        {"Dodaj stoisko"}
      </button>
    </form>
  );
}
