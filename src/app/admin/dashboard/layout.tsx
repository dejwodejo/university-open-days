import type { ReactNode } from "react";
import { playfair_display } from "~/styles/fonts";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="my-5 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
