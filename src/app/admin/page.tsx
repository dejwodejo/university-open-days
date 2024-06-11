"use server";

import { db } from "~/server/db";
import { AdminLoginForm } from "../_components/dashboard/AdminLoginForm";

export default async function AdminAuthPage() {
  const divisions = await db.query.divisions.findMany();

  return (
    <div>
      <p className="mx-40 mb-6 text-gray-600">
        {
          "Wybierz wydział który organizuje Dni Otwarte. Aby się zalogować, użyj hasła podanego każdemu wydziałowi w wiadomości email."
        }
      </p>
      <AdminLoginForm divisions={divisions} />
    </div>
  );
}
