import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,
  IonSpinner, IonIcon, IonText, IonRefresher, IonRefresherContent, RefresherCustomEvent
} from '@ionic/angular/standalone';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { PokemonService } from '../services/pokemon.service';
import { NamedAPIResourceList } from '../services/interfaces';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { addIcons } from 'ionicons';
import { warning } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonText,
    IonIcon,
    IonSpinner,
    IonCol,
    IonGrid,
    IonRow,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PokemonCardComponent,
    MatPaginatorModule
  ]
})
export class HomePage implements OnInit {
  private pokemonService = inject(PokemonService);
  public resourceList?: NamedAPIResourceList;
  public pageSize = 48;
  public pageIndex = 0;

  public isLoading = false;
  public hasError = false;

  constructor() { }

  ngOnInit() {
    addIcons({ warning });
    this.getPokemonResources();
  }

  handlePageEvent(event: PageEvent) {
    this.getPokemonResources(event.pageIndex);
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.getPokemonResources(0, event.detail.complete, event.detail.complete);
  }

  getPokemonResources(
    pageIndex = 0,
    onSucess: CallableFunction | null = null,
    onError: CallableFunction | null = null
  ) {
    this.isLoading = true;
    this.pageIndex = pageIndex;
    const offset = this.pageSize * pageIndex;
    this.pokemonService.getPokemonResourceList(offset, this.pageSize).subscribe({
      next: (newResourceList) => {
        this.resourceList = { ...newResourceList };
        this.isLoading = false
        this.hasError = false
        onSucess?.();
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        console.log(err);
        onError?.();
      }
    })
  }
}