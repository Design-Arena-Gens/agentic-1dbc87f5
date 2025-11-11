import { Sparkles } from "lucide-react";

import type { HeroClass } from "@/types/game";

type Props = {
  heroClass: HeroClass;
  onRecruit: (id: string) => void;
};

export default function HeroClassCard({ heroClass, onRecruit }: Props) {
  const { name, role, description, passive, abilities, stats } = heroClass;

  return (
    <article className="glass-panel flex flex-col gap-4 p-6 transition hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-xl duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm uppercase tracking-wide text-brand-200/70">{role}</p>
        </div>
        <button className="btn-primary" onClick={() => onRecruit(heroClass.id)}>
          Recruit
        </button>
      </div>

      <p className="text-sm text-slate-200/80 leading-relaxed">{description}</p>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
        <p className="flex items-center gap-2 text-brand-200">
          <Sparkles size={16} />
          Passive — <span className="font-semibold text-white">{passive}</span>
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2 text-xs font-medium text-slate-300">
        {Object.entries(stats).map(([key, value]) => (
          <span
            className="rounded-xl border border-white/10 bg-white/10 px-2 py-1 text-center uppercase tracking-wide"
            key={key}
          >
            {key.slice(0, 3)} <span className="block text-base font-semibold">{value}</span>
          </span>
        ))}
      </div>

      <ul className="grid gap-3 text-sm text-slate-200">
        {abilities.map((ability) => (
          <li
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-3"
            key={ability.id}
          >
            <p className="font-semibold text-white">{ability.name}</p>
            <p className="text-xs uppercase tracking-wide text-brand-200/70">
              {ability.type} • cost {ability.cost}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {ability.description}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
