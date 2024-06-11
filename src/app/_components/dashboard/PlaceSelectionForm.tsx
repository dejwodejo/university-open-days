"use client";

import { useState, ChangeEvent } from "react";
import { useFormState } from "react-dom";
import addPlaceSelection from "~/actions/addPlaceSelection";

interface Room {
  number: string;
  id: number;
  floorId: number;
}

interface Floor {
  id: number;
  label: string | null;
  level: number | null;
  buildingId: number;
  rooms: Room[];
}

interface Building {
  id: number;
  name: string;
  campusName: string;
  floors: Floor[];
}

interface Campus {
  name: string;
  buildings: Building[];
}

interface PlaceSelectionFormProps {
  campuses: Campus[];
}

export default function PlaceSelectionForm({
  campuses,
}: PlaceSelectionFormProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);
  const [state, action] = useFormState(addPlaceSelection, null);

  const handleBuildingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const buildingId = parseInt(event.target.value, 10);
    const building = campuses
      .flatMap((campus) => campus.buildings)
      .find((building) => building.id === buildingId);
    setSelectedBuilding(building || null);
    setSelectedFloors([]); // Reset selected floors when changing buildings
  };

  const handleFloorCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const floorId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedFloors([...selectedFloors, floorId]);
    } else {
      setSelectedFloors(selectedFloors.filter((id) => id !== floorId));
    }
  };

  const isSubmitDisabled = selectedFloors.length === 0; // Disable submit if no floors are selected

  return (
    <form action={action} className="flex flex-col items-center gap-4">
      <select
        name="building"
        onChange={handleBuildingChange}
        className="form-select my-2 w-full rounded-2xl border-2 p-2"
        required
      >
        <option value="">Wybierz budynek</option>
        {campuses
          .flatMap((campus) => campus.buildings)
          .map((building) => (
            <option key={building.id} value={building.id}>
              {`${building.campusName}, ${building.name}`}
            </option>
          ))}
      </select>

      <div className="flex flex-col flex-wrap">
        {selectedBuilding?.floors.map((floor) => (
          <label key={floor.id} className="m-1 flex items-center">
            <input
              type="checkbox"
              name="floors[]"
              value={floor.id}
              onChange={handleFloorCheckboxChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">
              {floor.label || `Piętro ${floor.level}`}
            </span>
          </label>
        ))}
      </div>

      {state?.message}
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full rounded-2xl border-2 p-2 shadow-sm duration-300 ${isSubmitDisabled ? "" : "hover:bg-gray-300"}`}
      >
        {"Zapisz ustawienia"}
      </button>
    </form>
  );
}
