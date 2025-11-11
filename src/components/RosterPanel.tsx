import HeroClassCard from "@/components/HeroClassCard";
import { heroClasses } from "@/data/classes";
import { useGameStore } from "@/store/useGameStore";

export default function RosterPanel() {
  const addHero = useGameStore((state) => state.addHeroToParty);

  return (
    <section className="glass-panel grid gap-6 p-6">
      <header>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-200/60">
          Operative Roster
        </p>
        <h2 className="text-2xl font-semibold text-white">Aetherborn Archetypes</h2>
        <p className="mt-2 text-sm text-slate-300/80">
          Requisition elite combatants forged in the sanctum. Each specialist brings unique
          passives and battlefield tactics.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {heroClasses.map((heroClass) => (
          <HeroClassCard heroClass={heroClass} key={heroClass.id} onRecruit={addHero} />
        ))}
      </div>
    </section>
  );
}
