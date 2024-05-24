import { Component, Input, OnInit, inject } from '@angular/core';
import { NamedAPIResource, Pokemon } from '../services/interfaces';
import { TitleCasePipe } from '@angular/common'
import { addIcons } from 'ionicons';
import { IonItem, IonLabel, IonNote, IonIcon, IonAvatar, IonImg } from '@ionic/angular/standalone'
import { chevronForward } from 'ionicons/icons';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss'],
  standalone: true,
  imports: [IonImg, IonAvatar, IonItem, IonLabel, IonNote, IonIcon, PokemonListItemComponent, TitleCasePipe]
})
export class PokemonListItemComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  @Input() pokemonResource!: NamedAPIResource;

  public pokemon?: Pokemon;

  constructor() {
    addIcons({ chevronForward });
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemonByName(this.pokemonResource.name).subscribe((pokemonResutl) => {
      this.pokemon = pokemonResutl;
    })
  }
}
