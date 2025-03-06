import { City, Vehicle } from "@/types";

export const CITIES: City[] = [
  {
    name: "Yapkashnagar",
    distance: 60,
    description: "Neon Oasis with glowing alleys",
  },
  {
    name: "Lihaspur",
    distance: 50,
    description: "Misty Labyrinth with ancient temples",
  },
  {
    name: "Narmis City",
    distance: 40,
    description: "Steel Jungle with skyscrapers",
  },
  {
    name: "Shekharvati",
    distance: 30,
    description: "Sun-Kissed Valley with mining tunnels",
  },
  {
    name: "Nuravgram",
    distance: 20,
    description: "Quirky Village with talking robots",
  },
];

export const VEHICLES: Vehicle[] = [
  { type: "EV Bike", range: 60, count: 2 },
  { type: "EV Car", range: 100, count: 1 },
  { type: "EV SUV", range: 120, count: 1 },
];
