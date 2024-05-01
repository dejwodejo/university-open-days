"use client";

import { useFormState } from "react-dom";
import { type ChangeEvent, useState } from "react";
import loginHandler from "~/actions/loginHandler";

export const dynamic = "force-dynamic";

interface LoginFormProps {
  loginType: "email" | "phoneNr";
}

export function LoginForm({ loginType }: LoginFormProps) {
  const [state, action] = useFormState(loginHandler, null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputMode = loginType === "email" ? "email" : "tel";
  const placeholder =
    loginType === "email" ? "Wprowadź adres email" : "Wprowadź numer telefonu";
  const pattern =
    loginType === "email" ? "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" : "^d{9}$";
  const minLength = loginType === "email" ? 5 : 9;
  const maxLength = loginType === "email" ? 100 : 9;

  const validateInput = (value: string) => {
    if (loginType === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else {
      return false;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIsButtonDisabled(!validateInput(value));
  };

  return (
    <section className={"flex w-full items-center justify-center p-3"}>
      <form
        action={action}
        inputMode={inputMode}
        className={"flex w-2/3 flex-col items-center justify-center"}
      >
        <label htmlFor={loginType}></label>
        <input
          id={loginType}
          name={loginType}
          type={inputMode}
          placeholder={placeholder}
          onChange={handleInputChange}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete="on"
          className={"w-full rounded-2xl border-2 p-2"}
          autoFocus
          required
        />

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`${isButtonDisabled ? "text-gray-300" : "hover:bg-gray-300"} m-3 w-full rounded-2xl border-2 p-2 shadow-sm duration-300`}
        >
          {"Wyślij kod autoryzacyjny"}
        </button>
      </form>
    </section>
  );
}
