import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSkeletonText, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonNote, IonBadge, IonGrid, IonRow, IonCol, IonListHeader, IonText } from '@ionic/angular/standalone';
import { Ability, Pokemon, VerboseEffect } from '../../services/interfaces';
import { PokemonService } from '../../services/pokemon.service';
import { NameFormatterPipe } from '../../pipes/name-formatter.pipe';
import { forkJoin } from 'rxjs';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

interface ViewAbility {
  name: Ability["name"]
  shortEffect?: VerboseEffect["short_effect"]
}

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [IonText, IonSkeletonText, IonListHeader, IonCol, IonRow, IonGrid, IonBadge, IonNote, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonItem, IonList, IonBackButton, IonButtons, TitleCasePipe, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NameFormatterPipe, LoadingComponent, ErrorComponent]
})
export class PokemonDetailsPage implements OnInit {
  private pokemonService = inject(PokemonService);

  @Input() name!: string;

  public pokemon?: Pokemon;
  public abilities?: ViewAbility[] = [];
  public isLoading = false;
  public hasError = false;
  public hasErrorAbility = false;

  constructor() { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.isLoading = true;

    this.pokemonService.getPokemonByName(this.name).subscribe({
      next: (pokemonResult) => {
        this.pokemon = pokemonResult;
        this.LoadAbilities();
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

  LoadAbilities() {
    if (!this.pokemon?.abilities) return;

    const requests = this.pokemon.abilities.map(
      ability => this.pokemonService.getAbility(ability.ability.name)
    );

    forkJoin(requests).subscribe({
      next: (abilities) => {
        this.abilities = [...abilities.map(this.mapAbilityToViewAbility)]
      },
      error: (err) => {
        this.hasErrorAbility = true;
        console.error(err);
      }
    });
  }

  mapAbilityToViewAbility(ability: Ability) {
    let shortEffect = ability.effect_entries
      .find((entry) => entry.language.name == 'en')?.short_effect

    return {
      name: ability.name,
      shortEffect
    } as ViewAbility
  }
}
