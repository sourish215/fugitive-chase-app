"use client";

import React from "react";
import { Vehicle } from "@/types";

interface VehicleSelectorProps {
  copName: string;
  copCity: string;
  cityDistance: number;
  vehicles: Vehicle[];
  availableVehicles: Vehicle[];
  selectedVehicle: string;
  onSelectVehicle: (copName: string, vehicleType: string) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  copName,
  copCity,
  cityDistance,
  vehicles,
  availableVehicles,
  selectedVehicle,
  onSelectVehicle,
}) => {
  // Check if a vehicle has enough range for round trip
  const hasEnoughRange = (vehicleRange: number, distance: number) => {
    return vehicleRange >= distance * 2;
  };

  return (
    <div className="p-4 border rounded-md text-black bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">
        Choose a vehicle for {copName}
      </h2>
      <p className="mb-4">
        Investigating: {copCity} (Round-trip: {cityDistance * 2} KM)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => {
          const available =
            availableVehicles.find((v) => v.type === vehicle.type)?.count || 0;
          const selected = selectedVehicle === vehicle.type;
          const hasRange = hasEnoughRange(vehicle.range, cityDistance);

          return (
            <button
              key={vehicle.type}
              type="button"
              onClick={() => onSelectVehicle(copName, vehicle.type)}
              disabled={!hasRange || (!selected && available === 0)}
              className={`p-3 border rounded text-center transition ${
                selected
                  ? "bg-blue-500 text-white border-blue-600"
                  : hasRange
                  ? available > 0
                    ? "bg-white hover:bg-blue-50 cursor-pointer border-gray-300"
                    : "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                  : "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
              }`}
            >
              <p className="font-bold">{vehicle.type}</p>
              <p>Range: {vehicle.range} KM</p>
              <p>
                {hasRange
                  ? selected
                    ? "Selected"
                    : `Available: ${available}`
                  : "Not enough range"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleSelector;
