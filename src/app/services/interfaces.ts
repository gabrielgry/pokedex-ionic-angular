type Nullable<T> = T | null;

export interface NamedAPIResourceList {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: NamedAPIResource[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  types: PokemonType[];
}

export interface PokemonSprites {
  front_default: Nullable<string>;
  front_shiny: Nullable<string>;
  front_female: Nullable<string>;
  front_shiny_female: Nullable<string>;
  back_default: Nullable<string>;
  back_shiny: Nullable<string>;
  back_female: Nullable<string>;
  back_shiny_female: Nullable<string>;
  other: PokemonOtherSprites;
}

export interface PokemonOtherSprites {
  'official-artwork': PokemonOfficialArtwork;
}

export interface PokemonOfficialArtwork {
  front_default: Nullable<string>;
  front_shiny: Nullable<string>;
}

export interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface PokemonAbility {
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  slot: number;
  ability: NamedAPIResource;
}

export interface Ability {
  id: number;
  name: string;
  generation: NamedAPIResource;
  effect_entries: VerboseEffect[];
}

export interface VerboseEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}
