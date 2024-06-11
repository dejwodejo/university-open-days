"use client";

import { useFormState } from "react-dom";
import addMainSettings from "~/actions/addMainSettings";

interface MainContentsFormProps {
  organizers: {
    name: string;
    value: string;
  }[];
}

export function MainContentsForm({ organizers }: MainContentsFormProps) {
  const [state, action] = useFormState(addMainSettings, null);

  return (
    <form action={action} className="flex flex-col items-center justify-center">
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Wprowadź tytuł wydarzenia"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      />

      <input
        id="date"
        name="date"
        type="date"
        className="my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      />

      <select
        name="organizer"
        className="form-select my-2 w-[100%] rounded-2xl border-2 p-2"
        required
      >
        <option value="">{"Wybierz organizatora"}</option>
        {organizers.map(({ name, value }) => (
          <option key={"option-" + value} value={value}>
            {name}
          </option>
        ))}
      </select>

      <p aria-live="polite">{state?.message}</p>
      <button
        type="submit"
        className="m-3 w-full rounded-2xl border-2 p-2 shadow-sm duration-300 hover:bg-gray-300"
      >
        {"Zapisz ustawienia"}
      </button>
    </form>
  );
}
