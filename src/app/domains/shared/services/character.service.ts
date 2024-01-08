import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { searchDomains } from "../../../context/Api"
import { Character } from '../../../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient)

  constructor() { }

  getCharacters() {
    return this.http.get<Character[]>(searchDomains.apiCharacter)
  }
}
