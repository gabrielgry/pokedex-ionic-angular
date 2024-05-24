export interface NamedAPIResourceList {
    count: number,
    next: string | null,
    previous: string | null,
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
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
}