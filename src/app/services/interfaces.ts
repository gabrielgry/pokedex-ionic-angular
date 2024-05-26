type Nullable<T> = T | null;

export interface NamedAPIResourceList {
    count: number,
    next: Nullable<string>,
    previous: Nullable<string>,
    results: NamedAPIResource[]
}

export interface NamedAPIResource {
    name: string,
    url: string,
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
    // abilities: PokemonAbility[];
    // forms: NamedAPIResource[];
    // game_indices: VersionGameIndex[];
    // held_items: PokemonHeldItem[];
    // location_area_encounters: string;
    // moves: PokemonMove[];
    // species: NamedAPIResource;
    // stats: PokemonStat[];
    // types: PokemonType[];
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
    other: PokemonOtherSprites
}

export interface PokemonOtherSprites {
    "official-artwork": PokemonOfficialArtwork
}

export interface PokemonOfficialArtwork {
    front_default: Nullable<string>
    front_shiny: Nullable<string>
} 