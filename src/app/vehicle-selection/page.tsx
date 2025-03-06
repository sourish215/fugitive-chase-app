"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CITIES, VEHICLES } from "@/lib/data";
import { startGame } from "@/actions/gameActions";
import VehicleSelector from "@/components/VehicleSelector";

export default function VehicleSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get city selections from URL parameters
  const cop1City = searchParams.get("cop1City") || "";
  const cop2City = searchParams.get("cop2City") || "";
  const cop3City = searchParams.get("cop3City") || "";

  // State for vehicle selections
  const [vehicleSelections, setVehicleSelections] = useState({
    cop1Vehicle: "",
    cop2Vehicle: "",
    cop3Vehicle: "",
  });

  // Track available vehicles
  const [availableVehicles, setAvailableVehicles] = useState(
    VEHICLES.map((v) => ({ ...v }))
  );

  // Function to handle vehicle selection
  const handleVehicleSelect = (cop: string, vehicleType: string) => {
    // First, return any previously selected vehicle back to available
    const prevSelection =
      vehicleSelections[cop as keyof typeof vehicleSelections];
    if (prevSelection) {
      setAvailableVehicles((prev) =>
        prev.map((v) =>
          v.type === prevSelection ? { ...v, count: v.count + 1 } : v
        )
      );
    }

    // Then update the selection and decrease available count
    setVehicleSelections((prev) => ({ ...prev, [cop]: vehicleType }));
    setAvailableVehicles((prev) =>
      prev.map((v) =>
        v.type === vehicleType ? { ...v, count: v.count - 1 } : v
      )
    );
  };

  // Find city distances
  const getCityDistance = (cityName: string) => {
    const city = CITIES.find((c) => c.name === cityName);
    return city ? city.distance : 0;
  };

  const cop1Distance = getCityDistance(cop1City);
  const cop2Distance = getCityDistance(cop2City);
  const cop3Distance = getCityDistance(cop3City);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cop1City", cop1City);
    formData.append("cop2City", cop2City);
    formData.append("cop3City", cop3City);
    formData.append("cop1Vehicle", vehicleSelections.cop1Vehicle);
    formData.append("cop2Vehicle", vehicleSelections.cop2Vehicle);
    formData.append("cop3Vehicle", vehicleSelections.cop3Vehicle);

    await startGame(formData);
  };

  return (
    <div className="container  mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Vehicle Selection</h1>

      <div className="mb-4">
        <p>
          Cop 1 City: <span className="font-bold">{cop1City}</span> (
          {cop1Distance} KM)
        </p>
        <p>
          Cop 2 City: <span className="font-bold">{cop2City}</span> (
          {cop2Distance} KM)
        </p>
        <p>
          Cop 3 City: <span className="font-bold">{cop3City}</span> (
          {cop3Distance} KM)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <VehicleSelector
          copName="Cop 1"
          copCity={cop1City}
          cityDistance={cop1Distance}
          vehicles={VEHICLES}
          availableVehicles={availableVehicles}
          selectedVehicle={vehicleSelections.cop1Vehicle}
          onSelectVehicle={(_, vehicle) =>
            handleVehicleSelect("cop1Vehicle", vehicle)
          }
        />

        <VehicleSelector
          copName="Cop 2"
          copCity={cop2City}
          cityDistance={cop2Distance}
          vehicles={VEHICLES}
          availableVehicles={availableVehicles}
          selectedVehicle={vehicleSelections.cop2Vehicle}
          onSelectVehicle={(_, vehicle) =>
            handleVehicleSelect("cop2Vehicle", vehicle)
          }
        />

        <VehicleSelector
          copName="Cop 3"
          copCity={cop3City}
          cityDistance={cop3Distance}
          vehicles={VEHICLES}
          availableVehicles={availableVehicles}
          selectedVehicle={vehicleSelections.cop3Vehicle}
          onSelectVehicle={(_, vehicle) =>
            handleVehicleSelect("cop3Vehicle", vehicle)
          }
        />

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white cursor-pointer rounded hover:bg-gray-600"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={
              !vehicleSelections.cop1Vehicle ||
              !vehicleSelections.cop2Vehicle ||
              !vehicleSelections.cop3Vehicle
            }
            className={`px-4 py-2 rounded ${
              vehicleSelections.cop1Vehicle &&
              vehicleSelections.cop2Vehicle &&
              vehicleSelections.cop3Vehicle
                ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Start Investigation
          </button>
        </div>
      </form>
    </div>
  );
}
