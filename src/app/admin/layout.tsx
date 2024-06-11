import type { ReactNode } from "react";
import { playfair_display } from "~/styles/fonts";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 flex flex-col items-center justify-center">
      <h2
        className={`${playfair_display.className} my-2 text-center text-2xl font-bold lg:text-4xl`}
      >
        {"Panel administratora"}
      </h2>
      {children}
    </div>
  );
}
