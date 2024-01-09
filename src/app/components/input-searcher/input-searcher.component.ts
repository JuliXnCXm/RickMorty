import { Component, inject } from '@angular/core';
import { CharacterService } from '../../domains/shared/services/character.service';

@Component({
  selector: 'app-input-searcher',
  standalone: true,
  imports: [],
  templateUrl: './input-searcher.component.html',
  styleUrl: './input-searcher.component.sass'
})

export class InputSearcherComponent {

  private characterService = inject(CharacterService)

  /**
 * This function is called when the user types into the input field.
 * It updates the filterQuery state of the CharacterService with the input value.
 * @param {KeyboardEvent} event - The keyboard event that triggered the function call.
 */
changeHandler(event: Event) {
  const input = event.target as HTMLInputElement;
  const query = input.value;
  this.characterService.setQuery(query);
}
}
