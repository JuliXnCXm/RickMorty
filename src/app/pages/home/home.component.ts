import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { InputSearcherComponent } from '../../components/input-searcher/input-searcher.component';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent,InputSearcherComponent,CharacterListComponent,FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {

  currentUrl: string;
  
  constructor(private location: Location) {
    this.currentUrl = '';
  }
  
  ngOnInit(): void {
    this.currentUrl = this.location.path().substring(1);
  }
}
