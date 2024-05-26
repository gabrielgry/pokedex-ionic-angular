import { Component, Input, OnInit, inject } from '@angular/core';
import { NamedAPIResource, Pokemon } from '../services/interfaces';
import { addIcons } from 'ionicons';
import {
  IonIcon,
  IonImg,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonSkeletonText
} from '@ionic/angular/standalone'
import { heart, heartOutline, star, starOutline } from 'ionicons/icons';
import { PokemonService } from '../services/pokemon.service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { NameFormatterPipe } from '../pipes/name-formatter.pipe';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonButton,
    RouterLink,
    IonImg,
    IonIcon,
    NameFormatterPipe
  ]
})
export class PokemonCardComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private favoriteService = inject(FavoriteService);

  @Input() pokemonResource!: NamedAPIResource;

  public pokemon?: Pokemon;
  public isLoading = false;
  public hasError = false;

  constructor() {
    addIcons({ heart, heartOutline, star, starOutline });
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.isLoading = true;
    this.pokemonService
      .getPokemonByName(this.pokemonResource.name)
      .subscribe({
        next: (pokemonResutl) => {
          this.pokemon = pokemonResutl;
          this.isLoading = false;
          this.hasError = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.hasError = true;
          console.log(err);
        }
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
