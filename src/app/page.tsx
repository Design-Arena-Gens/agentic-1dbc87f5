"use client";

import BattleReport from "@/components/BattleReport";
import LogFeed from "@/components/LogFeed";
import MissionPanel from "@/components/MissionPanel";
import PartyPanel from "@/components/PartyPanel";
import RelicShelf from "@/components/RelicShelf";
import ResourceBar from "@/components/ResourceBar";
import RosterPanel from "@/components/RosterPanel";
import WorldStatePanel from "@/components/WorldStatePanel";
import { useGameStore } from "@/store/useGameStore";

export default function Home() {
  const { advanceDay, phase, party } = useGameStore((state) => ({
    advanceDay: state.advanceDay,
    phase: state.phase,
    party: state.party
  }));

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
      <ResourceBar />

      <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
        <div className="grid gap-6">
          <PartyPanel />
          <MissionPanel />
          <div className="glass-panel flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Advance the Cycle</h3>
              <p className="text-sm text-slate-300/80">
                Let your party recuperate, refresh mission intel, and generate new story hooks.
              </p>
            </div>
            <button
              className="btn-primary disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-400"
              disabled={phase === "engaged" || party.length === 0}
              onClick={advanceDay}
            >
              Resync Dawn
            </button>
          </div>
          <WorldStatePanel />
        </div>

        <div className="flex flex-col gap-6">
          <RosterPanel />
          <BattleReport />
          <RelicShelf />
          <LogFeed />
        </div>
      </section>
    </main>
  );
}
