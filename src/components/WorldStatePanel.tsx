import { enemyBestiary } from "@/data/enemies";
import { missions } from "@/data/missions";
import { useMemo } from "react";

export default function WorldStatePanel() {
  const intel = useMemo(() => {
    const highThreat = missions
      .slice()
      .sort((a, b) => b.threatLevel - a.threatLevel)
      .slice(0, 2);
    const notorious = enemyBestiary
      .slice()
      .sort((a, b) => b.threat - a.threat)
      .slice(0, 3);

    return { highThreat, notorious };
  }, []);

  return (
    <section className="glass-panel grid gap-4 p-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200/70">
          Aetheric Cartography
        </p>
        <h2 className="text-2xl font-semibold text-white">World State</h2>
        <p className="text-sm text-slate-300/80">
          Live resonance scans highlight escalating anomalies across the frontier.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-brand-200/70">Hot Zones</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-200/80">
            {intel.highThreat.map((mission) => (
              <li className="rounded-xl border border-white/10 px-3 py-2" key={mission.id}>
                <p className="font-semibold text-white">{mission.name}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Threat {mission.threatLevel}
                </p>
                <p className="text-xs text-slate-300/70">{mission.narrativeHook}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-brand-200/70">Nemesis Intel</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-200/80">
            {intel.notorious.map((enemy) => (
              <li className="rounded-xl border border-white/10 px-3 py-2" key={enemy.id}>
                <p className="font-semibold text-white">{enemy.name}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  {enemy.kind} · {enemy.rank} · Threat {enemy.threat}
                </p>
                <p className="text-xs text-slate-300/70">{enemy.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
