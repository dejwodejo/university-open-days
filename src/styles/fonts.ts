import { Inter, Oswald, Playfair_Display } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const playfair_display = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
