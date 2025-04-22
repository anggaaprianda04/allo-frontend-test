interface IRocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: Dimension;
  diameter: Dimension;
  mass: Mass;
  engines: Engines;
  description: string;
  flickr_images: string[];
}

interface Dimension {
  meters: number;
  feet: number;
}

interface Mass {
  kg: number;
  lb: number;
}

interface Engines {
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
}

export type { IRocket };
