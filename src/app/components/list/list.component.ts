import { State } from '../../enums/state';

import { AfterViewInit, Component, QueryList, TemplateRef, ViewChild, ViewChildren, inject } from '@angular/core';
import { CharacterService } from '../../domains/shared/services/character.service';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CommonModule } from '@angular/common';
import { EpisodeCardComponent } from '../episode-card/episode-card.component';
import { LocationCardComponent } from '../location-card/location-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    EpisodeCardComponent,
    LocationCardComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass',
})
export class CharacterListComponent implements AfterViewInit {
  public characterService = inject(CharacterService);
  @ViewChildren('character,episode,location', { read: TemplateRef}) public types!: QueryList<any>;

  constructor() {}

  /**
   * Creates a new IntersectionObserver instance.
   * @param {Function} callback - A function that is called every time an intersection event occurs.
   * @param {IntersectionObserverInit} [options] - An object that specifies options for the observer.
   */
  private observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.state == State.Loaded) {
        this.characterService.updatePage((page) => (page || 0) + 1);
      }
    });
  });

  

  ngAfterViewInit(): void {
    const ele = document.querySelector('#scroll-paginator');
    if (ele) {
      this.observer.observe(ele);
    }
  }

  get state() {
    return this.characterService.getState;
  }

  get list() {
    return this.characterService.getList;
  }

  get type() {
    if (this.characterService.getSearchType == "ubicaciones") return this.types.get(2)
    if (this.characterService.getSearchType == "episodios") return this.types.get(1)
    return this.types.get(0);
  }
}
