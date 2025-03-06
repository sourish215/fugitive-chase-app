"use server";

import {
  simulateCriminalLocation,
  checkCapture,
  checkVehicleAvailability,
} from "../lib/gameLogic";
import { redirect } from "next/navigation";

export async function startGame(formData: FormData) {
  const cities = [
    formData.get("cop1City"),
    formData.get("cop2City"),
    formData.get("cop3City"),
  ].map(String);

  const vehicles = [
    formData.get("cop1Vehicle"),
    formData.get("cop2Vehicle"),
    formData.get("cop3Vehicle"),
  ].map(String);

  // Validate unique cities
  if (new Set(cities).size !== 3) {
    throw new Error("Cities must be unique");
  }

  // Validate vehicle availability
  const vehiclesAvailable = await checkVehicleAvailability(vehicles);
  if (!vehiclesAvailable) {
    throw new Error("Not enough vehicles available");
  }

  const criminalLocation = await simulateCriminalLocation();
  const result = await checkCapture(criminalLocation, cities, vehicles);

  // Store in session or pass to result page
  redirect(
    `/result?captured=${result.captured}&cop=${
      result.capturingCop || 0
    }&criminal=${criminalLocation}`
  );
}
