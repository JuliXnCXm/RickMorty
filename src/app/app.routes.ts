import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterComponent } from './pages/character/character.component';

export const routes: Routes = [
  { path: ":searchType", component: HomeComponent , children: [
  ] },
  { path: 'character/:id', component: CharacterComponent },
  // {
  //   path: '**',
  //   redirectTo: '/characters',
  //   pathMatch: 'full'
  // }
];
