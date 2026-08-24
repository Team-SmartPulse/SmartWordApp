export type ItemType = "character" | "avatar" | "power-up" | "letter-pack" | "special";
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type GameItem = {
  id: number;
  name: string;
  type: ItemType;
  rarity: Rarity;
  description: string;
  utility: string;
  priceSwd: number;
  image: string;
};

export const GAME_ITEMS: GameItem[] = [
  {
    id: 1,
    name: "Lexi, Word Mage",
    type: "character",
    rarity: "legendary",
    description: "A legendary solver who turns scrambled letters into gold.",
    utility: "Starts each earn game with +1 hint.",
    priceSwd: 120,
    image: "/items/lexi.svg",
  },
  {
    id: 2,
    name: "Cipher Fox",
    type: "character",
    rarity: "epic",
    description: "Quick, clever, and always one vowel ahead.",
    utility: "+10 seconds on Intermediate and Advanced timers.",
    priceSwd: 75,
    image: "/items/fox.svg",
  },
  {
    id: 3,
    name: "Glyph Frame",
    type: "avatar",
    rarity: "rare",
    description: "A profile frame carved from glowing runes.",
    utility: "Cosmetic avatar frame on the wallet dashboard.",
    priceSwd: 40,
    image: "/items/glyph.svg",
  },
  {
    id: 4,
    name: "Neon Badge",
    type: "avatar",
    rarity: "uncommon",
    description: "A bright badge for players climbing the board.",
    utility: "Cosmetic badge next to your leaderboard name.",
    priceSwd: 18,
    image: "/items/badge.svg",
  },
  {
    id: 5,
    name: "Hint Spark",
    type: "power-up",
    rarity: "common",
    description: "A pocket flash that reveals the next letter.",
    utility: "Consume in-game for one extra hint.",
    priceSwd: 8,
    image: "/items/hint.svg",
  },
  {
    id: 6,
    name: "Time Crystal",
    type: "power-up",
    rarity: "common",
    description: "Slows the clock for a short burst.",
    utility: "Adds 30 seconds to the current stage timer.",
    priceSwd: 10,
    image: "/items/time.svg",
  },
  {
    id: 7,
    name: "Vowel Vault",
    type: "letter-pack",
    rarity: "rare",
    description: "A packed chest of extra vowels.",
    utility: "Guarantees one extra vowel in the next round.",
    priceSwd: 22,
    image: "/items/vowels.svg",
  },
  {
    id: 8,
    name: "Consonant Crate",
    type: "letter-pack",
    rarity: "rare",
    description: "Dense letters for tougher boards.",
    utility: "Adds a bonus consonant tile to Advanced rounds.",
    priceSwd: 22,
    image: "/items/consonants.svg",
  },
  {
    id: 9,
    name: "Golden Quill",
    type: "special",
    rarity: "legendary",
    description: "The scribe's relic. Words written with it pay extra.",
    utility: "1.2× SWD on completed earn games while owned.",
    priceSwd: 200,
    image: "/items/quill.svg",
  },
];

export function itemById(id: number): GameItem | undefined {
  return GAME_ITEMS.find((item) => item.id === id);
}
