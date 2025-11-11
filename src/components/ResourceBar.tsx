import { Zap, Star, Gem } from "lucide-react";

import { useGameStore } from "@/store/useGameStore";

export default function ResourceBar() {
  const { day, essence, renown } = useGameStore((state) => ({
    day: state.day,
    essence: state.essence,
    renown: state.renown
  }));

  const resources = [
    {
      label: "Cycle",
      value: day,
      icon: Zap,
      tint: "text-brand-200",
      description: "Dawn cycle since the sanctum awakened."
    },
    {
      label: "Essence",
      value: essence,
      icon: Gem,
      tint: "text-amber-200",
      description: "Resonant currency for forging upgrades."
    },
    {
      label: "Renown",
      value: renown,
      icon: Star,
      tint: "text-sky-200",
      description: "Influence with allied constellations."
    }
  ];

  return (
    <header className="glass-panel flex flex-wrap items-center justify-between gap-4 p-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200/70">
          Echoes of Aether
        </p>
        <h1 className="text-3xl font-semibold text-white">Tactical Command Interface</h1>
        <p className="text-sm text-slate-300/80">
          Curate a squad, plan operations, and resolve dynamic encounters in a reactive
          narrative sandbox.
        </p>
      </div>

      <ul className="flex flex-wrap gap-3">
        {resources.map((resource) => (
          <li
            className="flex min-w-[160px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
            key={resource.label}
          >
            <resource.icon className={`${resource.tint}`} size={22} />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                {resource.label}
              </p>
              <p className="text-lg font-semibold text-white">{resource.value}</p>
              <p className="text-[10px] text-slate-400">{resource.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </header>
  );
}
