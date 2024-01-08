import { Component, inject, signal } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../domains/shared/services/character.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.sass'
})
export class CharacterListComponent {
  characters = signal<Character[]>([])
  private characterService = inject(CharacterService)


  ngOnInit() {
    this.characterService.getCharacters()
    .subscribe({
      next: (characters) => {
        console.log(characters)
        this.characters.set(characters)
      },
      error:(error) => {
        console.log(error)
      }
    })
  }


}
