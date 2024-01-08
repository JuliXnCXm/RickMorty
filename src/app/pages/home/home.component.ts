import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { InputSearcherComponent } from '../../components/input-searcher/input-searcher.component';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent,InputSearcherComponent,CharacterListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  
}
