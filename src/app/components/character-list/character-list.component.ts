import { Component, Input, inject, signal } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../domains/shared/services/character.service';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.sass'
})
export class CharacterListComponent {
  charactersList = signal<Character[]>([])
  charactersItems: any;
  private characterService = inject(CharacterService)


  ngOnInit() {
    this.characterService.getCharacters()
    .subscribe((data:any) => {
      this.charactersList.set(data.results)
    })
  }


}
