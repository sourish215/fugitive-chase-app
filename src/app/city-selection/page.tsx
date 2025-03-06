"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CITIES } from "@/lib/data";
import CitySelector from "@/components/CitySelector";

export default function CitySelection() {
  const router = useRouter();
  const [citySelections, setCitySelections] = useState({
    cop1City: "",
    cop2City: "",
    cop3City: "",
  });

  // Track selected cities to prevent duplicates
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());

  const handleCitySelect = (cop: string, city: string) => {
    // Remove previous selection from the set
    const prevSelection = citySelections[cop as keyof typeof citySelections];
    if (prevSelection) {
      const newSet = new Set(selectedCities);
      newSet.delete(prevSelection);
      setSelectedCities(newSet);
    }

    // Add new selection
    setCitySelections((prev) => ({ ...prev, [cop]: city }));
    setSelectedCities((prev) => new Set(prev).add(city));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Navigate to vehicle selection with city choices as params
    router.push(
      `/vehicle-selection?cop1City=${encodeURIComponent(
        citySelections.cop1City
      )}&cop2City=${encodeURIComponent(
        citySelections.cop2City
      )}&cop3City=${encodeURIComponent(citySelections.cop3City)}`
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">City Selection</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CitySelector
          copName="Cop 1"
          cities={CITIES}
          selectedCities={selectedCities}
          currentSelection={citySelections.cop1City}
          onSelectCity={(_, city) => handleCitySelect("cop1City", city)}
        />

        <CitySelector
          copName="Cop 2"
          cities={CITIES}
          selectedCities={selectedCities}
          currentSelection={citySelections.cop2City}
          onSelectCity={(_, city) => handleCitySelect("cop2City", city)}
        />

        <CitySelector
          copName="Cop 3"
          cities={CITIES}
          selectedCities={selectedCities}
          currentSelection={citySelections.cop3City}
          onSelectCity={(_, city) => handleCitySelect("cop3City", city)}
        />

        <button
          type="submit"
          disabled={
            !citySelections.cop1City ||
            !citySelections.cop2City ||
            !citySelections.cop3City
          }
          className={`px-4 py-2 rounded ${
            citySelections.cop1City &&
            citySelections.cop2City &&
            citySelections.cop3City
              ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Vehicle Selection
        </button>
      </form>
    </div>
  );
}
