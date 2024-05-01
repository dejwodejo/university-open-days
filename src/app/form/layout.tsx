import { type ReactNode } from "react";

export default function FormLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div>{children}</div>
    </div>
  );
}
