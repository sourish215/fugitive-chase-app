"use server";

import { CITIES, VEHICLES } from "./data";

export async function simulateCriminalLocation(): Promise<string> {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex].name;
}

export async function checkCapture(
  criminalLocation: string,
  copCities: string[],
  copVehicles: string[]
): Promise<{ captured: boolean; capturingCop?: number }> {
  for (let i = 0; i < copCities.length; i++) {
    // Check if cop found the criminal
    if (copCities[i] === criminalLocation) {
      // Get city distance for round trip calculation
      const city = CITIES.find((c) => c.name === copCities[i]);
      if (!city) continue;

      // Get vehicle range
      const vehicle = VEHICLES.find((v) => v.type === copVehicles[i]);
      if (!vehicle) continue;

      // Check if vehicle has enough range for round trip (distance * 2)
      const roundTripDistance = city.distance * 2;
      if (vehicle.range >= roundTripDistance) {
        return { captured: true, capturingCop: i + 1 };
      }
    }
  }
  return { captured: false };
}

export async function checkVehicleAvailability(
  selectedVehicles: string[]
): Promise<boolean> {
  // Count how many of each vehicle type is selected
  const vehicleCounts: Record<string, number> = {};

  for (const vehicleType of selectedVehicles) {
    vehicleCounts[vehicleType] = (vehicleCounts[vehicleType] || 0) + 1;
  }

  // Check if selected count exceeds available count
  for (const vehicle of VEHICLES) {
    if ((vehicleCounts[vehicle.type] || 0) > vehicle.count) {
      return false;
    }
  }

  return true;
}
