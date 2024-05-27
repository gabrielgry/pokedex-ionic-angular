import { Component, Input, OnInit, inject } from '@angular/core';
import { NamedAPIResource, Pokemon } from 'src/app/services/interfaces';
import { addIcons } from 'ionicons';
import {
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { heart, heartOutline, star, starOutline } from 'ionicons/icons';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouterLink } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';
import { NameFormatterPipe } from 'src/app/pipes/name-formatter.pipe';

@Component({
  selector: 'app-pokemon-card',
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
    IonIcon,
    NameFormatterPipe,
  ],
})
export class PokemonCardComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private favoriteService = inject(FavoriteService);

  @Input() pokemonName!: string;

  public pokemon?: Pokemon;
  public isLoading = false;
  public hasError = false;

  constructor() {
    addIcons({ heart, heartOutline, star, starOutline });
  }

  ngOnInit() {
    this.getPokemon();
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favoriteService.isFavorite(pokemon.name);
  }

  toggleFavorite(event: MouseEvent, pokemon: Pokemon): Promise<void> {
    event.stopPropagation();
    return this.favoriteService.toggleFavorite(pokemon.name);
  }

  private getPokemon(): void {
    this.isLoading = true;
    this.pokemonService.getPokemonByName(this.pokemonName).subscribe({
      next: (pokemonResutl) => {
        this.pokemon = pokemonResutl;
        this.isLoading = false;
        this.hasError = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        console.log(err);
      },
    });
  }
}
