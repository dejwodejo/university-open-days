"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { modifyMainSettings } from "~/actions/modifyMainSettings";

interface TitleFormProps {
  currTitle: string | null | undefined;
}

export default function TitleForm({ currTitle }: TitleFormProps) {
  const [state, action] = useFormState(modifyMainSettings, null);

  const [edit, setEdit] = useState<boolean>(false);

  return (
    <form
      action={action}
      className="mt-5 flex flex-col border-b-2 border-gray-300 pb-2"
    >
      <p className="w-full text-center text-lg">
        {"Aktualny tytuł: "}
        <b>{currTitle ? currTitle : "Brak."}</b>
      </p>
      <div className="flex w-full flex-row">
        {!edit ? (
          <button
            className="duration-30 m-3 w-full rounded-2xl border-2 p-2 shadow-sm"
            onClick={() => setEdit(!edit)}
          >
            {"Edytuj"}
          </button>
        ) : (
          <div className="w-full">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Wprowadź tytuł wydarzenia"
              className="my-2 w-[70%] rounded-2xl border-2 p-2"
              defaultValue={currTitle ? currTitle : ""}
              required
            />
            <button
              type="submit"
              className="m-3 w-[25%] rounded-2xl border-2 p-2 shadow-sm duration-300 hover:bg-gray-300"
            >
              {"Zapisz"}
            </button>
          </div>
        )}

        {state?.message}
      </div>
    </form>
  );
}
