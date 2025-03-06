"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const captured = searchParams.get("captured") === "true";
  const cop = searchParams.get("cop") || "Unknown";
  const criminal = searchParams.get("criminal") || "Unknown";

  const onRestartClick = () => {
    router.push("/city-selection");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4">
        {captured ? `Cop ${cop} Captured the Fugitive!` : "Fugitive Escaped!"}
      </h1>
      <p>Criminal was hiding in {criminal}</p>

      <span className="cursor-pointer mt-6" onClick={onRestartClick}></span>

      <button
        type="button"
        onClick={onRestartClick}
        className="px-4 py-2 bg-gray-500 text-white cursor-pointer rounded hover:bg-gray-600"
      >
        Restart
      </button>
    </div>
  );
}
