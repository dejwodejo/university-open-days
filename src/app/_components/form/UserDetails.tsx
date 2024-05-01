"use client";

import {
  type City,
  type Region,
  type School,
  UserTypes,
} from "~/lib/definitions";
import { type ChangeEvent, useState } from "react";
import { addUserDetails } from "~/actions/addUserDetails";
import { useFormState } from "react-dom";

interface UserDetailsProps {
  addresses: Region[];
}

export default function UserDetails({ addresses }: UserDetailsProps) {
  const [state, action] = useFormState(addUserDetails, null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [userType, setUserType] = useState<UserTypes>(UserTypes.STUDENT);

  const handleUserTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as UserTypes);
  };

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = addresses.find(
      (region) => region.id.toString() === event.target.value,
    );

    if (!selected) return;

    setSelectedRegion(selected);
    setSelectedCity(null);
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!selectedRegion) return;

    const selected = selectedRegion.cities.find(
      (city) => city.id.toString() === event.target.value,
    );

    if (!selected) return;

    setSelectedCity(selected);
    setSelectedSchool(null);
  };

  const handleSchoolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!selectedCity) return;

    const selected = selectedCity.schools.find(
      (school) => school.id.toString() === event.target.value,
    );

    if (!selected) return;

    setSelectedSchool(selected);
  };

  return (
    <div className="flex items-center justify-center rounded-xl bg-gray-100 py-5 shadow-md">
      <form action={action} className="flex flex-col justify-center gap-4">
        <div className="flex justify-center">
          <h3 className="mr-2">{"Jesteś uczniem czy nauczycielem?"}</h3>
          <label className="mr-4 inline-flex items-center">
            <input
              type="radio"
              name="userType"
              value={UserTypes.STUDENT}
              checked={userType === UserTypes.STUDENT}
              onChange={handleUserTypeChange}
              className="form-radio text-black-600 h-4 w-4"
            />
            <span className="ml-1 text-gray-700">Uczniem</span>
          </label>
          <label className="inline-flex items-center justify-center">
            <input
              type="radio"
              name="userRole"
              value={UserTypes.TEACHER}
              checked={userType === UserTypes.TEACHER}
              onChange={handleUserTypeChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-1 text-gray-700">Nauczycielem</span>
          </label>
        </div>

        <div className="flex w-full items-center justify-center">
          <h3 className="mr-2">
            {"W jakim województwie znajduje się Twoja szkoła?"}
          </h3>
          <select
            name="region"
            onChange={handleRegionChange}
            className="form-select rounded-2xl border-2 p-2"
          >
            <option disabled={selectedRegion !== null} value="">
              {"Wybierz województwo"}
            </option>
            {addresses.map(({ id, name }, index) => (
              <option key={index} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full items-center justify-center">
          <h3 className="mr-2">
            {"W jakim mieście znajduje się Twoja szkoła?"}
          </h3>
          <select
            name="city"
            disabled={selectedRegion === null}
            onChange={handleCityChange}
            className="form-select w-[16vw] rounded-2xl border-2 p-2"
          >
            <option disabled={selectedCity !== null} value="">
              {"Wybierz miasto"}
            </option>
            {!!selectedRegion &&
              selectedRegion.cities.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex w-full items-center justify-center">
          <h3 className="mr-2">
            {userType === UserTypes.STUDENT
              ? "Do jakiej szkoły chodzisz?"
              : "W jakiej szkole uczysz?"}
          </h3>
          <select
            name="school"
            onChange={handleSchoolChange}
            disabled={selectedCity === null}
            className="form-select w-[20vw] rounded-2xl border-2 p-2"
          >
            <option disabled={selectedSchool !== null} value="">
              {"Wybierz województwo"}
            </option>
            {!!selectedCity &&
              selectedCity.schools.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={selectedSchool === null}
          className={`${selectedSchool === null ? "text-gray-300" : "hover:bg-gray-300"} m-3 w-full rounded-2xl border-2 p-2 shadow-sm duration-300`}
        >
          {"Przejdź do strony głównej"}
        </button>
      </form>
    </div>
  );
}
