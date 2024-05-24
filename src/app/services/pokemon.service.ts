import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NamedAPIResourceList, Pokemon } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private baseUrl = "https://pokeapi.co/api/v2";
    private http = inject(HttpClient);

    constructor() { }

    public getPokemonResourceListFromUrl(url: string): Observable<NamedAPIResourceList> {
        return this.http.get<NamedAPIResourceList>(url);
    }

    public getPokemonResourceList(offset = 20, limit = 20): Observable<NamedAPIResourceList> {
        const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
        return this.getPokemonResourceListFromUrl(url)
    }

    public getPokemonByName(name: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`)
    }
}
