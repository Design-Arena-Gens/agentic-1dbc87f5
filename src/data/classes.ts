import type { HeroClass } from "@/types/game";

export const heroClasses: HeroClass[] = [
  {
    id: "aegis-knight",
    name: "Aegis Knight",
    role: "Vanguard",
    description:
      "Front-line bulwark wielding crystallized shields of aetheric light, specializing in absorbing and redirecting incoming damage.",
    passive: "Bulwark Protocol — converts 15% of damage taken into retaliation pulses.",
    stats: {
      vitality: 18,
      power: 9,
      focus: 6,
      agility: 8,
      resolve: 15
    },
    abilities: [
      {
        id: "radiant-bastion",
        name: "Radiant Bastion",
        type: "defense",
        description:
          "Project a barrier around the team gaining temporary shields equal to 35% of vitality.",
        potency: 0.35,
        cost: 20,
        target: "team",
        tags: ["shield", "teamwide"]
      },
      {
        id: "Sun-Spear",
        name: "Sun Spear",
        type: "attack",
        description: "Hurl a spear of condensed light dealing heavy single-target damage.",
        potency: 1.4,
        cost: 25,
        target: "enemy",
        tags: ["piercing"]
      },
      {
        id: "guardian-surge",
        name: "Guardian Surge",
        type: "support",
        description: "Dispel a debuff and restore 20% vitality to an ally.",
        potency: 0.2,
        cost: 18,
        target: "ally",
        tags: ["cleanse", "heal"]
      }
    ]
  },
  {
    id: "lumisage",
    name: "Lumisage",
    role: "Mystic",
    description:
      "Channeler of celestial glyphs that alter probability and warp battlefield momentum.",
    passive: "Chrono Echo — first ability each round repeats at 60% efficiency.",
    stats: {
      vitality: 10,
      power: 12,
      focus: 18,
      agility: 9,
      resolve: 14
    },
    abilities: [
      {
        id: "chrono-lattice",
        name: "Chrono Lattice",
        type: "utility",
        description:
          "Delay enemy actions and grant the party a surge of focus increasing crit rate by 12% for two rounds.",
        potency: 0.12,
        cost: 22,
        target: "team",
        tags: ["haste", "debuff"]
      },
      {
        id: "astral-ray",
        name: "Astral Ray",
        type: "attack",
        description: "Beam of starlight scorching the target with scaling damage.",
        potency: 1.5,
        cost: 26,
        target: "enemy",
        tags: ["burn"]
      },
      {
        id: "veil-of-serenity",
        name: "Veil of Serenity",
        type: "support",
        description: "Cleanse panic and restore resolve to the party.",
        potency: 0.25,
        cost: 18,
        target: "team",
        tags: ["calm", "resolve"]
      }
    ]
  },
  {
    id: "stormrunner",
    name: "Stormrunner",
    role: "Rogue",
    description:
      "Hyper-mobile skirmisher who weaves lightning edge strikes with evasive maneuvers.",
    passive: "Slipstream — performing an attack grants a 20% evasion boost next round.",
    stats: {
      vitality: 12,
      power: 17,
      focus: 10,
      agility: 19,
      resolve: 9
    },
    abilities: [
      {
        id: "thunder-step",
        name: "Thunder Step",
        type: "attack",
        description: "Blink through an enemy dealing damage and entering stealth.",
        potency: 1.6,
        cost: 24,
        target: "enemy",
        tags: ["stealth", "burst"]
      },
      {
        id: "tempest-feint",
        name: "Tempest Feint",
        type: "utility",
        description: "Redistribute threat, causing enemies to miscalculate their target.",
        potency: 0.3,
        cost: 12,
        target: "enemy",
        tags: ["disorient"]
      },
      {
        id: "ion-blades",
        name: "Ion Blades",
        type: "attack",
        description: "Flurry of energized attacks scaling with agility.",
        potency: 1.2,
        cost: 20,
        target: "enemy",
        tags: ["multi-hit"]
      }
    ]
  },
  {
    id: "bio-savant",
    name: "Bio Savant",
    role: "Artificer",
    description:
      "Experimental alchemist that manipulates living aether spores to heal allies and dissolve foes.",
    passive:
      "Catalyst Bloom — every third ability used ignites a random spore reaction for bonus effects.",
    stats: {
      vitality: 11,
      power: 11,
      focus: 16,
      agility: 8,
      resolve: 13
    },
    abilities: [
      {
        id: "emerald-serum",
        name: "Emerald Serum",
        type: "support",
        description: "Heal an ally and grant regeneration equal to focus x 0.9.",
        potency: 0.9,
        cost: 21,
        target: "ally",
        tags: ["heal", "regen"]
      },
      {
        id: "corrosive-spores",
        name: "Corrosive Spores",
        type: "attack",
        description: "Blanket an enemy with spores, shredding armor over three rounds.",
        potency: 1.3,
        cost: 25,
        target: "enemy",
        tags: ["damage-over-time"]
      },
      {
        id: "panacea-burst",
        name: "Panacea Burst",
        type: "support",
        description: "Disperse restorative spores healing the whole party moderately.",
        potency: 0.55,
        cost: 28,
        target: "team",
        tags: ["team heal"]
      }
    ]
  },
  {
    id: "echo-gunner",
    name: "Echo Gunner",
    role: "Artificer",
    description:
      "Aether-tech sharpshooter syncing with sonic arrays for devastating ranged finisher shots.",
    passive: "Resonant Charge — critical hits echo for 35% of damage to another target.",
    stats: {
      vitality: 13,
      power: 19,
      focus: 8,
      agility: 11,
      resolve: 10
    },
    abilities: [
      {
        id: "harmonic-barrage",
        name: "Harmonic Barrage",
        type: "attack",
        description:
          "Unleash a calibrated burst that scales with both power and focus for guaranteed crit chance bonus.",
        potency: 1.7,
        cost: 30,
        target: "enemy",
        tags: ["ranged", "burst"]
      },
      {
        id: "sonic-overwatch",
        name: "Sonic Overwatch",
        type: "utility",
        description:
          "Guard an ally; the next time they are attacked, counter-fire triggers for bonus damage.",
        potency: 0.8,
        cost: 16,
        target: "ally",
        tags: ["counter", "protect"]
      },
      {
        id: "kinetic-slide",
        name: "Kinetic Slide",
        type: "utility",
        description: "Reposition swiftly, clearing debuffs and boosting agility temporarily.",
        potency: 0.25,
        cost: 12,
        target: "self",
        tags: ["mobility"]
      }
    ]
  },
  {
    id: "spirit-warden",
    name: "Spirit Warden",
    role: "Warden",
    description:
      "Keeper of ancestral echoes who binds souls and channels spectral shields to empower allies.",
    passive: "Ancestral Guard — first ally to fall each mission revives with 40% health.",
    stats: {
      vitality: 16,
      power: 12,
      focus: 12,
      agility: 7,
      resolve: 18
    },
    abilities: [
      {
        id: "soul-bind",
        name: "Soul Bind",
        type: "utility",
        description: "Shackle an enemy, reducing their power and agility considerably.",
        potency: 0.4,
        cost: 22,
        target: "enemy",
        tags: ["debuff"]
      },
      {
        id: "ancestral-aegis",
        name: "Ancestral Aegis",
        type: "support",
        description:
          "Weave spiritual shields granting resolve and vitality scaling barrier to all allies.",
        potency: 0.45,
        cost: 26,
        target: "team",
        tags: ["shield"]
      },
      {
        id: "spectral-lance",
        name: "Spectral Lance",
        type: "attack",
        description: "Impale a foe with spectral energy dealing resolve-scaled damage.",
        potency: 1.3,
        cost: 23,
        target: "enemy",
        tags: ["spirit", "piercing"]
      }
    ]
  }
];
