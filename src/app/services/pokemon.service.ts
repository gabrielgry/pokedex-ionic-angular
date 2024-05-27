import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ability, NamedAPIResourceList, Pokemon } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private http = inject(HttpClient);

  constructor() {}

  private getPokemonResourceListFromUrl(
    url: string,
  ): Observable<NamedAPIResourceList> {
    return this.http.get<NamedAPIResourceList>(url);
  }

  getPokemonResourceList(
    offset = 20,
    limit = 20,
  ): Observable<NamedAPIResourceList> {
    const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`;
    return this.getPokemonResourceListFromUrl(url);
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`);
  }

  getAbility(name: string): Observable<Ability> {
    return this.http.get<Ability>(`${this.baseUrl}/ability/${name}`);
  }
}
