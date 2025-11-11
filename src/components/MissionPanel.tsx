import { missions } from "@/data/missions";
import { estimateMissionSuccess, formatPercent } from "@/lib/calculations";
import { useGameStore } from "@/store/useGameStore";
import { Radar } from "lucide-react";

export default function MissionPanel() {
  const { party, selectedMission, phase, selectMission, launchMission } = useGameStore(
    (state) => ({
      party: state.party,
      selectedMission: state.selectedMission,
      phase: state.phase,
      selectMission: state.selectMission,
      launchMission: state.launchMission
    })
  );

  return (
    <section className="glass-panel flex flex-col gap-5 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-200/70">
            Strategic Command
          </p>
          <h2 className="text-2xl font-semibold text-white">Mission Dossier</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
          <Radar className="text-brand-200" size={14} /> {phase}
        </div>
      </header>

      <div className="grid gap-4">
        {missions.map((mission) => {
          const { successChance, projectedRounds } = estimateMissionSuccess(party, mission);
          const isSelected = selectedMission?.id === mission.id;
          const canLaunch = phase === "planning" && isSelected && party.length;

          return (
            <article
              className={`rounded-3xl border p-5 transition ${
                isSelected
                  ? "border-brand-400/60 bg-brand-500/15"
                  : "border-white/10 bg-white/5 hover:border-brand-400/30 hover:bg-brand-500/10"
              }`}
              key={mission.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{mission.name}</h3>
                  <p className="text-xs uppercase tracking-[0.35em] text-brand-200/70">
                    {mission.biome}
                  </p>
                </div>
                <button
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "bg-brand-400 text-slate-950"
                      : "bg-slate-800 text-white hover:bg-brand-500/40"
                  }`}
                  onClick={() => selectMission(mission.id)}
                >
                  {isSelected ? "Selected" : "Brief"}
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
                {mission.narrativeHook}
              </p>

              <dl className="mt-4 grid gap-2 text-xs uppercase text-slate-300/80 md:grid-cols-4">
                <div>
                  <dt className="text-[10px] tracking-widest text-slate-400">Objective</dt>
                  <dd className="text-sm font-semibold text-white">{mission.objective}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-widest text-slate-400">Threat</dt>
                  <dd className="text-sm font-semibold text-white">{mission.threatLevel}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-widest text-slate-400">
                    Projected Rounds
                  </dt>
                  <dd className="text-sm font-semibold text-white">{projectedRounds}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-widest text-slate-400">
                    Success Index
                  </dt>
                  <dd className="text-sm font-semibold text-white">
                    {formatPercent(successChance)}
                  </dd>
                </div>
              </dl>

              {canLaunch && (
                <button className="btn-primary mt-4 w-full" onClick={launchMission}>
                  Launch Operation
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
