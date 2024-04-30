"use client";

import "./assets/numericInput.css";
import { type ChangeEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { validateAuthCode } from "~/actions/validateAuthCode";

export default function AuthPage() {
  const searchParams = useSearchParams();

  const [state, action] = useFormState(validateAuthCode, {
    message: searchParams.get("email"),
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsButtonDisabled(!/^\d{6}$/.test(value));
  };

  return (
    <section>
      <form
        action={action}
        inputMode={"numeric"}
        className={"flex flex-col items-center justify-center"}
      >
        <label htmlFor={"userAuthCode"}></label>
        <input
          id={"userAuthCode"}
          name={"userAuthCode"}
          onChange={handleInputChange}
          type={"number"}
          placeholder={"Twój kod autoryzacyjny"}
          className={"w-full rounded-2xl border-2 p-2"}
          autoFocus
          required
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`${isButtonDisabled ? "text-gray-300" : "hover:bg-gray-300"} m-3 w-full rounded-2xl border-2 p-2 shadow-sm duration-300`}
        >
          {"Sprawdź kod"}
        </button>
      </form>
    </section>
  );
}
