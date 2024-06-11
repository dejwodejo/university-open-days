"use client";

import { useState, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import adminLoginHandler from "~/actions/adminLoginHandler";
import Division from "~/utils/types/Division";

export const dynamic = "force-dynamic";

interface AdminLoginFormProps {
  divisions: Division[];
}

const initialState = {
  message: "",
};

export function AdminLoginForm({ divisions }: AdminLoginFormProps) {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const [state, action] = useFormState(adminLoginHandler, initialState);

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
  };

  return (
    <form
      action={action}
      inputMode={"numeric"}
      className={"flex flex-col items-center justify-center"}
    >
      <label htmlFor={"division"}></label>
      <select
        name="division"
        onChange={handleDivisionChange}
        className="form-select my-2 w-[30vw] rounded-2xl border-2 p-2"
        required
      >
        <option disabled={selectedDivision !== null} value="">
          {"Wybierz wydział"}
        </option>
        {divisions.map(({ name, value }) => (
          <option key={"option-" + value} value={value}>
            {name}
          </option>
        ))}
      </select>
      <input
        id={"password"}
        name={"password"}
        type={"password"}
        maxLength={30}
        placeholder={"Wprowadź hasło"}
        className={"w-[30vw] rounded-2xl border-2 p-2"}
        autoFocus
        required
      />

      <p aria-live="polite">{state?.message}</p>
      <button
        type="submit"
        className={`m-3 w-[30vw] rounded-2xl border-2 p-2 shadow-sm duration-300`}
      >
        {"Zaloguj się"}
      </button>
    </form>
  );
}
