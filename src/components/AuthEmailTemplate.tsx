import { Tailwind } from "@react-email/components";

interface AuthEmailTemplateProps {
  authCode: string;
}

export default function AuthEmailTemplate({
  authCode,
}: AuthEmailTemplateProps) {
  return (
    <Tailwind>
      <h1 className=" text-center text-4xl font-bold">{"Hej!"}</h1>

      <p className="text-center text-base">
        {
          "oto twój kod do zalogowania się na stronę Drzwi Otwartych Uniwersytetu Zielonogórskiego:"
        }
      </p>
      <h2 className="font-semibold` text-center text-3xl">{authCode}</h2>

      <p className="text-center text-xs">
        {
          "Jeśli to nie Ty próbujesz się zalogować, możesz spokojnie zignorować tę wiadomość."
        }
      </p>
    </Tailwind>
  );
}
