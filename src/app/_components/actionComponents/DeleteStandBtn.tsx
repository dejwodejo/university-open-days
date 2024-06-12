"use client";

import { useFormState } from "react-dom";
import deleteStand from "~/actions/deleteStand";

interface DeleteContentsBtnProps {
  idToDelete: number;
}

export default function DeleteStandBtn({ idToDelete }: DeleteContentsBtnProps) {
  const [state, action] = useFormState(deleteStand, null);

  return (
    <form action={action}>
      <input
        id="idToDelete"
        readOnly
        name="idToDelete"
        value={idToDelete}
        className="hidden"
      ></input>
      <button
        type="submit"
        className="w-full rounded-2xl border-2 bg-red-400 p-2 shadow-sm duration-300 hover:bg-red-500"
      >
        {"Usuń"}
      </button>
      {state?.message}
    </form>
  );
}
