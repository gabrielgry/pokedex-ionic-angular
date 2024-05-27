import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-details/pokemon-details.page').then(m => m.PokemonDetailsPage)
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    pathMatch: 'full',
  }
];

