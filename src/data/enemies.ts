import type { Enemy } from "@/types/game";

export const enemyBestiary: Enemy[] = [
  {
    id: "void-reaver",
    name: "Void Reaver",
    description: "A clawed aberration that bleeds reality with every strike.",
    kind: "Aberration",
    rank: "Elite",
    threat: 72,
    stats: {
      vitality: 16,
      power: 21,
      focus: 14,
      agility: 17,
      resolve: 12
    }
  },
  {
    id: "crystal-warden",
    name: "Crystal Warden",
    description:
      "Animated sentinel forged from skyglass shards, projecting adaptive prism shields.",
    kind: "Sentry",
    rank: "Common",
    threat: 48,
    stats: {
      vitality: 18,
      power: 14,
      focus: 12,
      agility: 9,
      resolve: 15
    }
  },
  {
    id: "echo-siren",
    name: "Echo Siren",
    description: "Spectral manipulator that weaponizes sound and fear.",
    kind: "Phantom",
    rank: "Elite",
    threat: 65,
    stats: {
      vitality: 12,
      power: 17,
      focus: 19,
      agility: 13,
      resolve: 16
    }
  },
  {
    id: "storm-tyrant",
    name: "Storm Tyrant",
    description:
      "Colossal warlord clad in ionized plate whose hammer can shatter citadel walls.",
    kind: "Warlord",
    rank: "Mythic",
    threat: 95,
    stats: {
      vitality: 24,
      power: 26,
      focus: 14,
      agility: 10,
      resolve: 20
    }
  },
  {
    id: "prismatic-archon",
    name: "Prismatic Archon",
    description: "Living constellation that fractures into multiple light avatars mid-battle.",
    kind: "Archon",
    rank: "Mythic",
    threat: 105,
    stats: {
      vitality: 22,
      power: 22,
      focus: 24,
      agility: 18,
      resolve: 21
    }
  },
  {
    id: "gloom-crawler",
    name: "Gloom Crawler",
    description: "Skittering swarm that inflicts corrosive darkness on impact.",
    kind: "Aberration",
    rank: "Common",
    threat: 42,
    stats: {
      vitality: 11,
      power: 15,
      focus: 10,
      agility: 20,
      resolve: 8
    }
  }
];
