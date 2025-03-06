"use client";

import React from "react";
import { City } from "@/types";

interface CitySelectorProps {
  copName: string;
  cities: City[];
  selectedCities: Set<string>;
  currentSelection: string;
  onSelectCity: (copName: string, cityName: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  copName,
  cities,
  selectedCities,
  currentSelection,
  onSelectCity,
}) => {
  return (
    <div className="p-4 border text-black rounded-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">{copName} Selection</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cities.map((city) => {
          const isSelected = currentSelection === city.name;
          const isDisabled = selectedCities.has(city.name) && !isSelected;

          return (
            <button
              key={city.name}
              type="button"
              onClick={() => onSelectCity(copName, city.name)}
              disabled={isDisabled}
              className={`p-3 border rounded text-center transition ${
                isSelected
                  ? "bg-blue-500 text-white border-blue-600"
                  : isDisabled
                  ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                  : "bg-white hover:bg-blue-50 cursor-pointer border-gray-300"
              }`}
            >
              <p className="font-bold">{city.name}</p>
              <p className="text-sm">{city.distance} KM</p>
              <p className="text-xs mt-1">{city.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CitySelector;
