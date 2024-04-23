import { playfair_display } from "~/styles/fonts";
import { SignedOut, SignIn } from "@clerk/nextjs";

export default function Navbar() {
  const navElements = [
    {
      title: "Uczelnia",
      iconPath: "/uz-logo.png",
      width: 100,
      height: 60,
      url: "https://uz.zgora.pl/",
    },
    {
      title: "Rekrutacja",
      iconPath: "/recrutation-icon.png",
      url: "https://rekrutacja.uz.zgora.pl/",
    },
    {
      title: "Mapa wydarzenia",
      iconPath: "/map-icon.png",
      url: "#",
    },
  ];

  return (
    <nav>
      <h1
        className={`${playfair_display.className} my-8 text-center text-4xl font-bold lg:text-5xl`}
      >
        Dni Otwarte Uniwersytetu Zielonogórskiego
      </h1>
      <div>
        <SignedOut>
          <SignIn></SignIn>
        </SignedOut>
      </div>
    </nav>
  );
}
