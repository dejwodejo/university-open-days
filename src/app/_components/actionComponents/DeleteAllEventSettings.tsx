"use client";

import { useFormState } from "react-dom";
import { deleteContents } from "~/actions/deleteContents";

export default function DeleteAllEventSettings() {
  const [state, action] = useFormState(deleteContents, null);

  return (
    <form action={action}>
      <button
        type="submit"
        className="mt-3 w-full rounded-2xl bg-red-500 p-2 text-white duration-300 hover:bg-red-700"
      >
        {"Usuń"}
      </button>
      {state?.message}
    </form>
  );
}
