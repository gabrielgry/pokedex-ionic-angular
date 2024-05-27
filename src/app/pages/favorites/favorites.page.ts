import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  ViewWillEnter,
} from '@ionic/angular/standalone';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule,
    PokemonCardComponent,
    MatPaginatorModule,
  ],
})
export class FavoritesPage implements ViewWillEnter {
  private favoriteService = inject(FavoriteService);

  public allFavorites?: Set<string>;
  public favorites?: Set<string>;
  public pageSize = 24;
  public pageIndex = 0;
  public count = 0;

  constructor() {}

  ionViewWillEnter(): void {
    this.loadFavorites();
  }

  handlePageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateFavorites();
  }

  private async loadFavorites(): Promise<void> {
    const favorites = await this.favoriteService.getFavorites();
    this.allFavorites = new Set(favorites);
    this.count = this.allFavorites.size;
    this.updateFavorites();
  }

  private updateFavorites(): void {
    if (!this.allFavorites) {
      this.favorites = new Set();
      return;
    }

    const allFavoritesArray = Array.from(this.allFavorites);
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageFavorites = allFavoritesArray.slice(startIndex, endIndex);

    this.favorites = new Set(pageFavorites);
  }
}
