import type { HeroInstance, Mission } from "@/types/game";

const weightStats = (value: number, weight: number) => value * weight;

export const estimateMissionSuccess = (party: HeroInstance[], mission: Mission) => {
  if (!party.length) {
    return { successChance: 0, projectedRounds: 0 };
  }

  const partyScore = party.reduce((total, hero) => {
    const stats = hero.heroClass.stats;
    const base =
      weightStats(stats.vitality, 1.15) +
      weightStats(stats.power, 1.45) +
      weightStats(stats.focus, 1.35) +
      weightStats(stats.agility, 1.25) +
      weightStats(stats.resolve, 1.18);
    const morale = hero.statuses.some((status) => status.name === "Inspired") ? 12 : 0;
    return total + base + hero.level * 4 + morale;
  }, 0);

  const difficulty = mission.threatLevel * 2.1;
  const delta = partyScore - difficulty;
  const rawChance = 0.42 + delta / 200;
  const successChance = Math.min(0.92, Math.max(0.1, rawChance));

  return {
    successChance,
    projectedRounds: Math.max(3, Math.round(6 - delta / 160))
  };
};

export const formatPercent = (value: number) =>
  `${Math.round(Math.min(0.99, Math.max(0, value)) * 100)}%`;
