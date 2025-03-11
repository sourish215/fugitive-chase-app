import ResultComponent from "@/components/ResultComponent";
import { Suspense } from "react";

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultComponent />
    </Suspense>
  );
}
