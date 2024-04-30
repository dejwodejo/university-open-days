import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 flex flex-col items-center justify-center">
      <div className="mb-14 h-44 w-44 animate-spin rounded-full border-b-8 border-black"></div>
      {children}
    </div>
  );
}
