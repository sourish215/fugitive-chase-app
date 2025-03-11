import ResultComponent from "@/components/ResultComponent";
import { Suspense } from "react";

export default function Result() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <ResultComponent />
    </Suspense>
  );
}
