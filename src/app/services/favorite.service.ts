import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storage = inject(Storage);

  private _storage?: Storage;
  private key = 'favorites';
  private favorites = new Set<string>();

  constructor() {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
    this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    const favorites = await this._storage?.get(this.key);
    if (favorites) {
      this.favorites = favorites;
    }
  }

  isFavorite(name: string): boolean {
    return this.favorites.has(name);
  }

  async getFavorites(): Promise<Set<string>> {
    await this.loadFavorites();
    return this.favorites;
  }

  async toggleFavorite(name: string): Promise<void> {
    if (this.isFavorite(name)) {
      this.favorites.delete(name);
    } else {
      this.favorites.add(name);
    }

    await this._storage?.set(this.key, this.favorites);
  }
}
