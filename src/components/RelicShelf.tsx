import { useGameStore } from "@/store/useGameStore";
import { Sparkles } from "lucide-react";

export default function RelicShelf() {
  const relics = useGameStore((state) => state.relics);

  return (
    <section className="glass-panel flex flex-col gap-4 p-6">
      <header className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-200/70">Relics</p>
          <h2 className="text-2xl font-semibold text-white">Vault Inventory</h2>
        </div>
        <Sparkles className="text-brand-200" size={24} />
      </header>

      <ul className="grid gap-3 text-sm text-slate-200/80">
        {relics.map((relic) => (
          <li
            className="rounded-2xl border border-brand-500/40 bg-brand-500/10 px-4 py-3"
            key={relic}
          >
            {relic}
          </li>
        ))}
      </ul>
    </section>
  );
}
