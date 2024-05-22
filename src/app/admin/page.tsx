"use client";

import { type ChangeEvent, Suspense, useState } from "react";
import { useFormState } from "react-dom";
import adminLoginHandler from "~/actions/adminLoginHandler";

export default function AdminAuthPage() {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [state, action] = useFormState(adminLoginHandler, null);

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target);
    setSelectedDivision(event.target.value);
    enableButton();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    const { name, value } = event.target;
    if (name === "password" && value.length > 12) setPassword(value);
    enableButton();
  };

  const enableButton = () => {
    if (password && selectedDivision) setIsButtonDisabled(false);
  };

  return (
    <Suspense fallback={<>Loading...</>}>
      <section>
        <form
          action={action}
          inputMode={"numeric"}
          className={"flex flex-col items-center justify-center"}
        >
          <label htmlFor={"division"}></label>
          <select
            name="division"
            onChange={handleDivisionChange}
            className="form-select my-2 w-[20vw] rounded-2xl border-2 p-2"
            required
          >
            <option disabled={selectedDivision !== null} value="">
              {"Wybierz wydział"}
            </option>
            <option value="">{"Specjalny wydział"}</option>
          </select>
          <input
            id={"password"}
            name={"password"}
            onChange={handleInputChange}
            type={"password"}
            maxLength={30}
            placeholder={"Wprowadź hasło"}
            className={"w-full rounded-2xl border-2 p-2"}
            autoFocus
            required
          />
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`${isButtonDisabled ? "text-gray-300" : "hover:bg-gray-300"} m-3 w-full rounded-2xl border-2 p-2 shadow-sm duration-300`}
          >
            {"Zaloguj się"}
          </button>
        </form>
      </section>
    </Suspense>
  );
}
