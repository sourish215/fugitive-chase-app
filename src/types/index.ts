export interface City {
  name: string;
  distance: number;
  description: string;
}

export interface Vehicle {
  type: string;
  range: number;
  count: number;
}

export interface GameState {
  cities: City[];
  vehicles: Vehicle[];
  criminalLocation?: string;
  copSelections?: {
    cop1: { city: string; vehicle: string };
    cop2: { city: string; vehicle: string };
    cop3: { city: string; vehicle: string };
  };
}
