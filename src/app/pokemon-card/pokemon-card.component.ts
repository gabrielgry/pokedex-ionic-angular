import { Component, Input, OnInit, inject } from '@angular/core';
import { NamedAPIResource, Pokemon } from '../services/interfaces';
import { TitleCasePipe } from '@angular/common'
import { addIcons } from 'ionicons';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonAvatar,
  IonImg,
  IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle
} from '@ionic/angular/standalone'
import { heart, heartOutline, star, starOutline } from 'ionicons/icons';
import { PokemonService } from '../services/pokemon.service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonButton,
    RouterLink,
    IonImg,
    IonIcon,
    TitleCasePipe
  ]
})
export class PokemonCardComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private favoriteService = inject(FavoriteService);

  @Input() pokemonResource!: NamedAPIResource;

  public pokemon?: Pokemon;

  constructor() {
    addIcons({ heart, heartOutline, star, starOutline });
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService
      .getPokemonByName(this.pokemonResource.name)
      .subscribe((pokemonResutl) => {
        this.pokemon = pokemonResutl;
      })
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favoriteService.isFavorite(pokemon.name);
  }

  toggleFavorite(event: MouseEvent, pokemon: Pokemon) {
    event.stopPropagation();
    return this.favoriteService.toggleFavorite(pokemon.name);
  }
}
