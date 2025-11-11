import { useGameStore } from "@/store/useGameStore";
import { Trophy, XOctagon } from "lucide-react";

export default function BattleReport() {
  const { lastEncounter, phase, resetAftermath } = useGameStore((state) => ({
    lastEncounter: state.lastEncounter,
    phase: state.phase,
    resetAftermath: state.resetAftermath
  }));

  if (!lastEncounter) {
    return (
      <section className="glass-panel flex h-full min-h-[220px] flex-col justify-between p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-200/60">
            After Action
          </p>
          <h2 className="text-2xl font-semibold text-white">No combat data yet.</h2>
        </div>
        <p className="text-sm text-slate-300/80">
          Launch a mission to generate a tactical report and unlock bonus rewards.
        </p>
      </section>
    );
  }

  const Icon = lastEncounter.success ? Trophy : XOctagon;
  const iconColor = lastEncounter.success ? "text-brand-200" : "text-red-300";

  return (
    <section className="glass-panel flex flex-col gap-5 p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-200/70">
            After Action
          </p>
          <h2 className="text-2xl font-semibold text-white">Encounter Report</h2>
        </div>
        <Icon className={`${iconColor}`} size={28} />
      </header>

      <p className="text-sm leading-relaxed text-slate-200/80">{lastEncounter.summary}</p>

      <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
          Operative Outcomes
        </h3>
        <ul className="grid gap-2 text-xs text-slate-300">
          {lastEncounter.partyOutcome.map((hero) => (
            <li
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
              key={hero.nickname}
            >
              <span className="font-medium text-white">{hero.nickname}</span>
              <span>
                HP {Math.round(hero.healthRemaining)} · XP +{hero.xpEarned}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase text-slate-300/90">
        <div>
          <p className="text-[10px] tracking-widest text-slate-400">Essence</p>
          <p className="text-lg font-semibold text-white">
            +{Math.round(lastEncounter.rewards.essence)}
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-slate-400">Renown</p>
          <p className="text-lg font-semibold text-white">
            +{Math.round(lastEncounter.rewards.renown)}
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-slate-400">Relic</p>
          <p className="text-lg font-semibold text-white">
            {lastEncounter.rewards.relic ?? "None"}
          </p>
        </div>
      </div>

      {phase === "aftermath" && (
        <button className="btn-primary self-end" onClick={resetAftermath}>
          Close Report
        </button>
      )}
    </section>
  );
}
