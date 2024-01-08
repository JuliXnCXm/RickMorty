import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterComponent } from './pages/character/character.component';

export const routes: Routes = [
  { path: 'Personajes', component: HomeComponent },
  { path: 'Episodios', component: HomeComponent },
  { path: 'Ubicaciones', component: HomeComponent },
  // { path: '', component: HomeComponent },
  // { path: '', component: HomeComponent },
  { path: 'character/:id', component: CharacterComponent },
];
