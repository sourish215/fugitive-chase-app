"use client";

import { Suspense } from "react";
import VehicleSelectorList from "@/components/VehicleSelectorList";

export default function VehicleSelection() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <VehicleSelectorList />
    </Suspense>
  );
}
