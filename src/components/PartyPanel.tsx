import { Fragment, useState } from "react";

import { useGameStore } from "@/store/useGameStore";

export default function PartyPanel() {
  const { party, removeHeroFromParty, renameHero } = useGameStore((state) => ({
    party: state.party,
    removeHeroFromParty: state.removeHeroFromParty,
    renameHero: state.renameHero
  }));

  if (!party.length) {
    return (
      <section className="glass-panel flex h-full min-h-[280px] items-center justify-center p-8 text-center text-slate-300">
        <div>
          <p className="text-lg font-semibold text-white">No operatives assigned.</p>
          <p className="text-sm text-slate-300/80">
            Recruit combatants from the roster on the right to configure your strike team.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="glass-panel grid gap-4 p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-200/60">
            Strike Party
          </p>
          <h2 className="text-2xl font-semibold text-white">Operative Roster</h2>
        </div>
        <span className="rounded-full border border-brand-500/40 bg-brand-500/20 px-4 py-1 text-sm font-medium text-brand-100">
          {party.length}/4 ready
        </span>
      </header>

      <ul className="grid gap-4">
        {party.map((hero) => (
          <li
            className="rounded-2xl border border-white/10 bg-white/10 p-4 text-slate-200"
            key={hero.instanceId}
          >
            <article className="grid gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-lg font-semibold text-white">{hero.nickname}</span>
                <div className="flex gap-2">
                  <RenameHeroButton
                    currentName={hero.nickname}
                    onRename={(nickname) => renameHero(hero.instanceId, nickname)}
                  />
                  <button
                    className="btn-secondary text-xs"
                    onClick={() => removeHeroFromParty(hero.instanceId)}
                  >
                    Reserve
                  </button>
                </div>
              </div>

              <p className="text-sm text-brand-100/70">{hero.heroClass.name}</p>

              <dl className="grid grid-cols-4 gap-4 text-xs uppercase text-slate-300/90">
                <Fragment>
                  <div>
                    <dt className="text-[10px] tracking-widest text-slate-400">Health</dt>
                    <dd className="text-base font-semibold text-white">
                      {Math.round(hero.currentHealth)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-widest text-slate-400">Energy</dt>
                    <dd className="text-base font-semibold text-white">
                      {Math.round(hero.currentEnergy)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-widest text-slate-400">Level</dt>
                    <dd className="text-base font-semibold text-white">{hero.level}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-widest text-slate-400">
                      Experience
                    </dt>
                    <dd className="text-base font-semibold text-white">
                      {hero.experience}
                    </dd>
                  </div>
                </Fragment>
              </dl>

              {hero.statuses.length ? (
                <div className="flex flex-wrap gap-2">
                  {hero.statuses.map((status) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200"
                      key={status.id}
                    >
                      {status.name} · {status.duration} rds
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active statuses.</p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

type RenameHeroButtonProps = {
  currentName: string;
  onRename: (name: string) => void;
};

function RenameHeroButton({ currentName, onRename }: RenameHeroButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(currentName);

  const toggle = () => {
    setIsEditing((prev) => !prev);
    setValue(currentName);
  };

  if (!isEditing) {
    return (
      <button className="btn-secondary text-xs" onClick={toggle}>
        Rename
      </button>
    );
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onRename(value.trim() || currentName);
        setIsEditing(false);
      }}
    >
      <input
        autoFocus
        className="rounded-lg border border-brand-500/50 bg-slate-900/80 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        maxLength={28}
        value={value}
        onBlur={() => setIsEditing(false)}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="btn-primary text-xs" type="submit">
        Save
      </button>
    </form>
  );
}
