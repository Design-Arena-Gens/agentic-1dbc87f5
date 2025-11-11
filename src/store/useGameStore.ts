import { heroClasses } from "@/data/classes";
import { enemyBestiary } from "@/data/enemies";
import { missions } from "@/data/missions";
import { relicDeck } from "@/data/relics";
import type {
  EncounterResult,
  HeroInstance,
  Mission,
  StatusEffect
} from "@/types/game";
import { create } from "zustand";
import { nanoid } from "nanoid";

type GamePhase = "planning" | "engaged" | "aftermath";

type GameState = {
  day: number;
  essence: number;
  renown: number;
  relics: string[];
  party: HeroInstance[];
  bench: HeroInstance[];
  selectedMission?: Mission;
  lastEncounter?: EncounterResult;
  log: string[];
  phase: GamePhase;
  addHeroToParty: (heroClassId: string) => void;
  removeHeroFromParty: (instanceId: string) => void;
  renameHero: (instanceId: string, nickname: string) => void;
  selectMission: (missionId: string) => void;
  launchMission: () => void;
  advanceDay: () => void;
  resetAftermath: () => void;
};

type SimulationPayload = {
  party: HeroInstance[];
  mission: Mission;
};

const PARTY_LIMIT = 4;

const roll = (min: number, max: number) => Math.random() * (max - min) + min;

const calculateHeroScore = (hero: HeroInstance) => {
  const { stats } = hero.heroClass;
  const base =
    stats.vitality * 1.2 +
    stats.power * 1.45 +
    stats.focus * 1.3 +
    stats.agility * 1.25 +
    stats.resolve * 1.15;
  const levelBonus = hero.level * 5;
  const statusPenalty = hero.statuses.reduce((total, status) => {
    const modifierPenalty =
      (status.modifier.vitality ?? 0) +
      (status.modifier.power ?? 0) +
      (status.modifier.focus ?? 0) +
      (status.modifier.agility ?? 0) +
      (status.modifier.resolve ?? 0);
    return total + modifierPenalty;
  }, 0);
  return base + levelBonus - statusPenalty;
};

const randomStatus = (name: string): StatusEffect | undefined => {
  const seed = Math.random();
  if (seed < 0.65) {
    return undefined;
  }

  const effects: StatusEffect[] = [
    {
      id: `${name}-burn`,
      name: "Scorched",
      description: "Took residual burn damage.",
      duration: 2,
      modifier: { vitality: -1 }
    },
    {
      id: `${name}-fatigue`,
      name: "Fatigued",
      description: "Mission exerted intense focus drain.",
      duration: 1,
      modifier: { focus: -2, resolve: -1 }
    },
    {
      id: `${name}-inspired`,
      name: "Inspired",
      description: "Victory infused renewed purpose.",
      duration: 2,
      modifier: { resolve: 3 }
    }
  ];

  return effects[Math.floor(Math.random() * effects.length)];
};

const simulateEncounter = ({ party, mission }: SimulationPayload): EncounterResult => {
  const partyScore = party.reduce((total, hero) => total + calculateHeroScore(hero), 0);
  const threatPool = enemyBestiary
    .sort(() => Math.random() - 0.5)
    .slice(0, roll(2, 4));
  const threatValue = threatPool.reduce((acc, enemy) => acc + enemy.threat, 0);
  const paddedThreat = threatValue + mission.threatLevel * roll(0.85, 1.35);
  const scoreDelta = partyScore - paddedThreat;
  const successChance = Math.min(0.92, Math.max(0.15, 0.5 + scoreDelta / 160));
  const success = Math.random() < successChance;
  const rounds = Math.round(roll(3, 7));

  const partyOutcome = party.map((hero) => {
    const baseDamageShift = success ? roll(0.05, 0.38) : roll(0.2, 0.75);
    const damage = hero.heroClass.stats.vitality * baseDamageShift;
    const healthRemaining = Math.max(hero.currentHealth - damage, 0);
    const xpEarned = Math.round(
      (mission.threatLevel * (success ? 1.2 : 0.65) * roll(0.7, 1.3)) / party.length
    );

    return {
      nickname: hero.nickname,
      healthRemaining,
      xpEarned
    };
  });

  const rewards = {
    essence: Math.round(mission.rewards.essence * (success ? roll(0.95, 1.25) : 0.4)),
    renown: Math.round(mission.rewards.renown * (success ? roll(0.9, 1.15) : 0.35)),
    relic: success && Math.random() < mission.rewards.relicChance ? drawRelic() : undefined
  };

  const summary = success
    ? `Mission ${mission.name} succeeded in ${rounds} rounds. ${threatPool
        .map((enemy) => enemy.name)
        .join(", ")} neutralized.`
    : `Mission ${mission.name} faltered after ${rounds} rounds. Retreat executed with ${
        rewards.essence
      } essence salvaged.`;

  return {
    missionId: mission.id,
    success,
    rounds,
    summary,
    partyOutcome,
    rewards
  };
};

const drawRelic = () => {
  const relic = relicDeck[Math.floor(Math.random() * relicDeck.length)];
  return `${relic.name} — ${relic.description}`;
};

const calculateNickname = (heroClassName: string) => {
  const tags = [
    "Vanguard",
    "Prodigy",
    "Echo",
    "Vesper",
    "Solstice",
    "Warden",
    "Cipher",
    "Radiant",
    "Cascade",
    "Tempest"
  ];
  const suffix = tags[Math.floor(Math.random() * tags.length)];
  return `${heroClassName.split(" ")[0]} ${suffix}`;
};

export const useGameStore = create<GameState>((set, get) => ({
  day: 1,
  essence: 240,
  renown: 80,
  relics: ["Celestial Compass — reveals high-value missions each dawn."],
  party: [],
  bench: [],
  selectedMission: undefined,
  lastEncounter: undefined,
  log: [
    "Welcome to Echoes of Aether. Assemble your strike party and chart your next incursion."
  ],
  phase: "planning",
  addHeroToParty: (heroClassId) => {
    const { party, bench, log } = get();
    if (party.length >= PARTY_LIMIT) {
      set({
        log: [
          ...log,
          "Command limit reached. Dismiss a hero before recruiting another operative."
        ]
      });
      return;
    }

    const heroClass = heroClasses.find((hero) => hero.id === heroClassId);
    if (!heroClass) {
      return;
    }

    const newHero: HeroInstance = {
      instanceId: nanoid(),
      heroClass,
      nickname: calculateNickname(heroClass.name),
      currentHealth: heroClass.stats.vitality * 6,
      currentEnergy: heroClass.stats.focus * 4,
      level: 1,
      experience: 0,
      statuses: []
    };

    set({
      party: [...party, newHero],
      bench,
      log: [...log, `${newHero.nickname} ( ${heroClass.name} ) has joined the strike team.`]
    });
  },
  removeHeroFromParty: (instanceId) => {
    const { party, bench, log } = get();
    const target = party.find((hero) => hero.instanceId === instanceId);
    if (!target) {
      return;
    }

    set({
      party: party.filter((hero) => hero.instanceId !== instanceId),
      bench: [...bench, target],
      log: [...log, `${target.nickname} has been rotated to reserve duty.`]
    });
  },
  renameHero: (instanceId, nickname) => {
    set((state) => ({
      party: state.party.map((hero) =>
        hero.instanceId === instanceId ? { ...hero, nickname } : hero
      ),
      log: [...state.log, `Updated callsign: ${nickname}.`]
    }));
  },
  selectMission: (missionId) => {
    const mission = missions.find((entry) => entry.id === missionId);
    if (!mission) {
      return;
    }

    set((state) => ({
      selectedMission: mission,
      log: [...state.log, `Mission prep: ${mission.name} (${mission.biome}).`]
    }));
  },
  launchMission: () => {
    const { party, selectedMission, log, phase } = get();
    if (party.length === 0 || !selectedMission || phase === "engaged") {
      return;
    }

    const result = simulateEncounter({ party, mission: selectedMission });
    const updatedParty = party.map((hero) => {
      const report = result.partyOutcome.find((p) => p.nickname === hero.nickname);
      if (!report) {
        return hero;
      }
      const newHealth = Math.max(report.healthRemaining, hero.heroClass.stats.vitality * 2);
      const nextLevelThreshold = hero.level * 120;
      const experience = hero.experience + report.xpEarned;
      const leveledUp = experience >= nextLevelThreshold;

      const newStatusEffect = randomStatus(hero.nickname);
      const statuses = newStatusEffect
        ? [...hero.statuses, newStatusEffect]
        : hero.statuses;

      return {
        ...hero,
        currentHealth: newHealth,
        currentEnergy: hero.currentEnergy,
        experience: leveledUp ? experience - nextLevelThreshold : experience,
        level: leveledUp ? hero.level + 1 : hero.level,
        statuses
      };
    });

    set({
      essence: get().essence + result.rewards.essence,
      renown: get().renown + result.rewards.renown,
      relics:
        result.rewards.relic && !get().relics.includes(result.rewards.relic)
          ? [...get().relics, result.rewards.relic]
          : get().relics,
      lastEncounter: result,
      phase: "aftermath",
      log: [...log, result.summary],
      party: updatedParty
    });
  },
  advanceDay: () => {
    const { day, party, log } = get();
    const recoveredParty = party.map((hero) => ({
      ...hero,
      currentHealth: Math.min(
        hero.currentHealth + hero.heroClass.stats.vitality * 1.4,
        hero.heroClass.stats.vitality * 6
      ),
      currentEnergy: Math.min(
        hero.currentEnergy + hero.heroClass.stats.focus * 1.6,
        hero.heroClass.stats.focus * 4
      ),
      statuses: hero.statuses
        .map((status) => ({ ...status, duration: status.duration - 1 }))
        .filter((status) => status.duration > 0)
    }));

    set({
      day: day + 1,
      party: recoveredParty,
      log: [...log, "New dawn over Aether. Operatives restored vitality in the sanctum."],
      phase: "planning",
      selectedMission: undefined
    });
  },
  resetAftermath: () => {
    set((state) => ({
      phase: "planning",
      lastEncounter: undefined,
      log: [
        ...state.log,
        "After-action review completed. Strategic operations ready for next directive."
      ]
    }));
  }
}));
