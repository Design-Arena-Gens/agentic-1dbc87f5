import type { Mission } from "@/types/game";

export const missions: Mission[] = [
  {
    id: "radiant-cradle",
    name: "Radiant Cradle",
    biome: "Crystal Wells",
    objective: "Stabilize the singing spires before resonance collapse.",
    threatLevel: 55,
    narrativeHook:
      "The luminous spires of the Crystal Wells are screaming as void fissures pierce the aquifer. Stabilize them before the fractures spiral toward the capital.",
    rewards: {
      essence: 120,
      relicChance: 0.28,
      renown: 35
    }
  },
  {
    id: "ashen-hollows",
    name: "Ashen Hollows",
    biome: "Shattered Forest",
    objective: "Hunt down the Echo Siren controlling a corrupted choir.",
    threatLevel: 68,
    narrativeHook:
      "An Echo Siren has bent the withered treants into a deathly choir. Silence the song and free the spirits bound within the roots.",
    rewards: {
      essence: 160,
      relicChance: 0.4,
      renown: 45
    }
  },
  {
    id: "citadel-of-gales",
    name: "Citadel of Gales",
    biome: "Skybreak Citadel",
    objective: "Disarm the Storm Tyrant before his hammer ruptures the dome.",
    threatLevel: 92,
    narrativeHook:
      "The Storm Tyrant towers over the floating citadel, gathering energy to annihilate the city below. Sabotage his conduits and bring him down.",
    rewards: {
      essence: 250,
      relicChance: 0.55,
      renown: 80
    }
  },
  {
    id: "twilight-sanctum",
    name: "Twilight Sanctum",
    biome: "Aether Ruins",
    objective: "Cleanse prismatic anchors feeding a nascent Archon.",
    threatLevel: 88,
    narrativeHook:
      "Within a decayed monastery, prismatic anchors coalesce into a newborn Archon. Sever the anchors before the constellation attains full awareness.",
    rewards: {
      essence: 220,
      relicChance: 0.48,
      renown: 70
    }
  }
];
