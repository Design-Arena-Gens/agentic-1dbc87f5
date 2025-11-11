export type StatBlock = {
  vitality: number;
  power: number;
  focus: number;
  agility: number;
  resolve: number;
};

export type Ability = {
  id: string;
  name: string;
  type: "attack" | "support" | "utility" | "defense";
  description: string;
  potency: number;
  cost: number;
  target: "enemy" | "ally" | "self" | "team";
  tags?: string[];
};

export type HeroClass = {
  id: string;
  name: string;
  role: "Vanguard" | "Arcanist" | "Artificer" | "Warden" | "Rogue" | "Mystic";
  description: string;
  passive: string;
  stats: StatBlock;
  abilities: Ability[];
};

export type StatusEffect = {
  id: string;
  name: string;
  description: string;
  duration: number;
  modifier: Partial<StatBlock>;
};

export type HeroInstance = {
  instanceId: string;
  heroClass: HeroClass;
  nickname: string;
  currentHealth: number;
  currentEnergy: number;
  level: number;
  experience: number;
  statuses: StatusEffect[];
};

export type Enemy = {
  id: string;
  name: string;
  description: string;
  kind: "Aberration" | "Sentry" | "Warlord" | "Phantom" | "Archon";
  rank: "Common" | "Elite" | "Mythic";
  stats: StatBlock;
  threat: number;
};

export type Mission = {
  id: string;
  name: string;
  biome: "Aether Ruins" | "Shattered Forest" | "Crystal Wells" | "Skybreak Citadel";
  objective: string;
  threatLevel: number;
  narrativeHook: string;
  rewards: {
    essence: number;
    relicChance: number;
    renown: number;
  };
};

export type EncounterResult = {
  missionId: string;
  success: boolean;
  rounds: number;
  summary: string;
  partyOutcome: {
    nickname: string;
    healthRemaining: number;
    xpEarned: number;
  }[];
  rewards: {
    essence: number;
    renown: number;
    relic?: string;
  };
};
