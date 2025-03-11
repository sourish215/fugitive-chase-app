"use client";

import { Suspense } from "react";
import VehicleSelectorList from "@/components/VehicleSelectorList";

export default function VehicleSelection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VehicleSelectorList />
    </Suspense>
  );
}
