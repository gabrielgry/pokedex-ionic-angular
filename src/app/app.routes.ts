import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pages/pokemon/pokemon.page').then((m) => m.PokemonDetailsPage),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites/favorites.page').then(
            (m) => m.FavoritesPage,
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

1;
