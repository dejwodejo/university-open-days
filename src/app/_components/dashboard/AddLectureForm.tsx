"use client";

import { useFormState } from "react-dom";
import { ChangeEvent, useState } from "react";
import addLecture from "~/actions/addLecture";

interface LectureFormProps {
  eventDate: string;
  rooms: {
    number: string;
    id: number;
    floorId: number;
  }[];
}

export function AddLectureForm({ rooms, eventDate }: LectureFormProps) {
  const [selectedLectureType, setSelectedLectureType] = useState<string | null>(
    null,
  );
  const handleLectureTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLectureType(event.target.value);
  };

  const [state, action] = useFormState(addLecture, null);

  return (
    <form action={action} className="flex flex-col items-center justify-center">
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Tytuł wykładu"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      />

      <textarea
        id="description"
        name="description"
        placeholder="Opis wykładu"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        maxLength={1000}
        required
      />

      <select
        name="type"
        className="form-select my-2 w-[100%] rounded-2xl border-2 p-2"
        onChange={handleLectureTypeChange}
        required
      >
        <option value="" disabled={!!selectedLectureType}>
          {"Wybierz typ wykładu"}
        </option>
        <option value="interactive">{"Interaktywny"}</option>
        <option value="traditional">{"Tradycyjny"}</option>
      </select>

      <p className="mt-3">{`Wybrany dzień wydarzenia to ${eventDate}.`}</p>
      <div className="flex w-full flex-row justify-center gap-3">
        <input
          id="start"
          name="start"
          type="time"
          className="my-2 w-[20%] rounded-2xl border-2 p-2"
          required
        />

        <input
          id="end"
          name="end"
          type="time"
          className="my-2 w-[20%] rounded-2xl border-2 p-2"
          required
        />
      </div>

      <input
        id="authors"
        name="authors"
        type="text"
        placeholder="Wprowadź autorów"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      />

      <select
        name="roomId"
        className="form-select my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      >
        <option value="">{"Wybierz pomieszczenie"}</option>
        {rooms.map(({ id, number }) => (
          <option key={id} value={id}>
            {"Sala " + number}
          </option>
        ))}
      </select>

      <p>
        {state?.errors?.map((issue) => (
          <p aria-live="polite">- {issue.message}</p>
        ))}
      </p>
      <button
        type="submit"
        disabled={eventDate === "NIE USTAWIONO"}
        className={`m-3 mb-10 w-full rounded-2xl border-2 p-2 shadow-sm duration-300 ${eventDate === "NIE USTAWIONO" ? "" : "hover:bg-gray-300"}`}
      >
        {"Dodaj wykład"}
      </button>
    </form>
  );
}
