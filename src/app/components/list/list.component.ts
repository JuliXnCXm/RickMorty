import { State } from '../../enums/state';

import { AfterViewInit, Component, QueryList, TemplateRef, ViewChild, ViewChildren, inject } from '@angular/core';
import { CharacterService } from '../../domains/shared/services/character.service';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CommonModule } from '@angular/common';
import { EpisodeCardComponent } from '../episode-card/episode-card.component';
import { LocationCardComponent } from '../location-card/location-card.component';
import { ActivatedRoute } from '@angular/router';

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
  filtered: boolean  = false;

  @ViewChildren('character,episode,location', { read: TemplateRef}) public types!: QueryList<any>;
  
  private characterService = inject(CharacterService);
  
  constructor(private activeRouter: ActivatedRoute) {
        this.activeRouter.queryParamMap.subscribe((params: any) => {
      if (params.params.ids) {
        this.filtered = true;
      } else {
        this.filtered = false;
      }
    });
  }

  /**
   * Creates a new IntersectionObserver instance.
   * @param {Function} callback - A function that is called every time an intersection event occurs.
   * @param {IntersectionObserverInit} [options] - An object that specifies options for the observer.
   */
  private observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.state == State.Loaded && !this.filtered) {
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
