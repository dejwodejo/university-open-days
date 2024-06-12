"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { modifyMainSettings } from "~/actions/modifyMainSettings";

interface OrganizatorFormProps {
  currOrg: string | null | undefined;
  orgs: {
    name: string;
    value: string;
  }[];
}

export default function OrganizatorForm({
  currOrg,
  orgs,
}: OrganizatorFormProps) {
  const [state, action] = useFormState(modifyMainSettings, null);

  const [edit, setEdit] = useState<boolean>(false);

  return (
    <form action={action} className="mt-5 flex flex-col pb-2">
      <p className="w-full text-center text-lg">
        {"Aktualny organizator: "}
        <b>{currOrg ? currOrg : "Brak."}</b>
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
            <select
              name="organizer"
              className="form-select my-2 w-[70%] rounded-2xl border-2 p-2"
              required
            >
              <option value="">{"Wybierz organizatora"}</option>
              {orgs.map(({ name, value }) => (
                <option key={"option-" + value} value={value}>
                  {name}
                </option>
              ))}
            </select>
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
