import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  RefresherCustomEvent,
  InfiniteScrollCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonInfiniteScrollContent,
  IonInfiniteScroll, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { NamedAPIResource, NamedAPIResourceList } from '../services/interfaces';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    PokemonCardComponent
  ],
})
export class HomePage implements OnInit {
  private pokemonService = inject(PokemonService);

  private nextPageUrl: string | null = null
  public pokemonResources: NamedAPIResource[] = []

  constructor() { }

  ngOnInit(): void {
    this.getPokemonResources();
  }

  getPokemonResources() {
    this.pokemonService.getPokemonResourceList().subscribe((resourceListResponse) => {
      this.nextPageUrl = resourceListResponse.next;
      this.pokemonResources.push(...resourceListResponse.results);
    })
  }

  getMorePokemonResources(event: InfiniteScrollCustomEvent) {
    if (!this.nextPageUrl) return;

    this.pokemonService.getPokemonResourceListFromUrl(this.nextPageUrl).subscribe((resourceListResponse) => {
      this.nextPageUrl = resourceListResponse.next;
      this.pokemonResources.push(...resourceListResponse.results);
      event.target.complete();
    })
  }
}
