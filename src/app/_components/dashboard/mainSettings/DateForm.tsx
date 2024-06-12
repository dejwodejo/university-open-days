"use client";

import { format } from "date-fns";
import { useState } from "react";
import { useFormState } from "react-dom";
import { modifyMainSettings } from "~/actions/modifyMainSettings";

interface DateFormProps {
  currDate: Date | null | undefined;
}

export default function TitleForm({ currDate }: DateFormProps) {
  const [state, action] = useFormState(modifyMainSettings, null);

  const [edit, setEdit] = useState<boolean>(false);

  return (
    <form
      action={action}
      className="mt-5 flex flex-col border-b-2 border-gray-300 pb-2"
    >
      <p className="w-full text-center text-lg">
        {"Aktualna data: "}
        <b>{currDate ? format(currDate, "yyyy-MM-dd") : "Brak."}</b>
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
              id="date"
              name="date"
              type="date"
              className="my-2 w-[70%] rounded-2xl border-2 p-2"
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
      </div>

      {state?.message}
    </form>
  );
}
