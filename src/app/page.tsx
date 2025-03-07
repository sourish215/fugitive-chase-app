import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg md:text-4xl text-center font-bold mb-8">
        Fugitive Chase Game
      </h1>
      <Link
        href="/city-selection"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Start Chase
      </Link>
    </div>
  );
}
