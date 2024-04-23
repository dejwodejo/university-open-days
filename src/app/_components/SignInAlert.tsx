import { SignUp } from "@clerk/nextjs";

export default function SignInAlert() {
  return (
    <div className="flex flex-col rounded-2xl border-2 border-black bg-white p-5 shadow-black">
      <p className="mb-2 text-justify text-base">
        {
          "Aby przejść do strony Dni Otwartych Uniwersytetu Zielonogórskiego, musisz najpierw założyć konto lub się zalogować."
        }
      </p>
      <div className="flex w-full flex-row justify-center">
        <SignUp routing={"hash"} forceRedirectUrl={"/form"} />
      </div>
    </div>
  );
}
