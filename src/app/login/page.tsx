"use client";

import { useState } from "react";
import { oswald, playfair_display } from "~/styles/fonts";
import { LoginForm } from "~/app/_components/LoginForm";

export default function LoginPage() {
  const [loginWithEmail, setLoginWithEmail] = useState<boolean>(true);

  const handleMethodChange = (loginMethod: "email" | "phoneNr") => {
    setLoginWithEmail(loginMethod === "email");
  };

  return (
    <div>
      <h2
        className={`${playfair_display.className} my-8 text-center text-xl font-bold lg:text-3xl`}
      >
        {"Zanim przejdziesz dalej, musisz się zalogować"}
      </h2>
      <div
        className={`mx-10 rounded-2xl border-2 p-3 shadow-sm duration-300 ${loginWithEmail ? "cursor-auto" : "cursor-pointer hover:bg-gray-300"}`}
        onClick={() => handleMethodChange("email")}
      >
        <h3
          className={`${oswald.className} text-center text-xl font-normal lg:text-2xl`}
        >
          {"Za pomocą adresu email"}
        </h3>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${loginWithEmail ? "max-h-96 scale-100 opacity-100" : "max-h-0 scale-95 opacity-0"}`}
        >
          <LoginForm loginType={"email"} />
        </div>
      </div>
      <div
        className={`mx-10 mt-6 rounded-2xl border-2 p-3 shadow-sm duration-300 ${loginWithEmail ? "cursor-pointer hover:bg-gray-300" : "cursor-auto"}`}
        onClick={() => handleMethodChange("phoneNr")}
      >
        <h3
          className={`${oswald.className} text-center text-xl font-normal lg:text-2xl`}
        >
          {"Za pomocą numeru telefonu"}
        </h3>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${loginWithEmail ? "max-h-0 scale-95 opacity-0" : "max-h-96 scale-100 opacity-100"}`}
        >
          <LoginForm loginType={"phoneNr"} />
        </div>
      </div>
    </div>
  );
}
