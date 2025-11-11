import { useMemo } from "react";

import { useGameStore } from "@/store/useGameStore";

export default function LogFeed() {
  const { log } = useGameStore((state) => ({ log: state.log }));

  const chronicle = useMemo(() => [...log].reverse(), [log]);

  return (
    <section className="glass-panel flex max-h-[400px] flex-col overflow-hidden p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-200/70">Chronicle</p>
          <h2 className="text-2xl font-semibold text-white">Command Log</h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-slate-300/80">
          Latest actions
        </span>
      </header>

      <div className="mt-4 flex-1 overflow-y-auto pr-2">
        <ul className="grid gap-3 text-sm text-slate-200/85">
          {chronicle.map((entry, index) => (
            <li
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              key={`${entry}-${index}`}
            >
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
