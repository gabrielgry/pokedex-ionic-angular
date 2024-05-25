import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Pokemon } from '../services/interfaces';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, TitleCasePipe, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PokemonDetailsPage implements OnInit {
  private pokemonService = inject(PokemonService);

  @Input() name!: string;

  public pokemon?: Pokemon;

  constructor() { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemonByName(this.name).subscribe((pokemonResult) => {
      this.pokemon = pokemonResult;
    })
  }
}
