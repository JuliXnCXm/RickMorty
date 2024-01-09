import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import env from '../../../../enviroment/enviroment';
import { Character } from '../../../models/character.model';
import { State } from '../../../enums/state';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Episode } from '../../../models/episode.model';
import { Location as LocationModel } from '../../../models/location.model';

type Response<T> = {
  info: Record<string, string>;
  results: T[];
};

type SearchType = 'apiBase' | 'ubicaciones' | 'personajes' | 'episodios';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private state = signal<State>(State.Loading);
  private list = signal<any[]>([]);
  private filters = signal<Record<string, string>>({});
  private ids = signal<string>("");

    /**
   * Creates an instance of CharacterService.
   * @param {Location} location - An instance of the Location service.
   * @param {Router} router - An instance of the Router service.
   * @param {ActivatedRoute} activeRouter - An instance of the ActivatedRoute service.
   */
  constructor(private location: Location, private router: Router, private activeRouter: ActivatedRoute) {
      /**
     * Sets the initial values of the service's properties.
     */
    this.filters.set({
      page: '1',
      endPoint: this.location.path().substring(1) || 'personajes',
    });
      /**
     * Subscribes to changes to the query parameters of the active route, and updates the service's `ids` property accordingly.
     */
    this.activeRouter.queryParamMap.subscribe((params: any) => {
      if (params.params.ids) {
        this.ids.set(params.params.ids || "");
      } else {
        this.ids.set("");
      }
    });
    /**
     * Subscribes to navigation events from the router, and updates the service's `endPoint` property accordingly.
     */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const path =
          this.router.getCurrentNavigation()?.extractedUrl.root.children[
            'primary'
          ].segments[0].path;
        const endPoint =
          path?.match(/personajes|episodios|ubicaciones/g)?.at(0) ||
          'personajes';
        

        this.filters.set({
          page: '1',
          endPoint,
        });
      });

    effect(
      () => {
        this.getCharacters();
      },
      {
        allowSignalWrites: true,
      }
    );
  }
    /**
   * Returns the current state of the service.
   * @returns {State} The current state of the service.
   */
  get getState() {
    return this.state();
  }
   /**
   * Returns the list of characters returned from the Marvel API.
   * @returns {any[]} The list of characters.
   */
  get getList() {
    return this.list();
  }
  /**
   * Returns the type of search being performed.
   * @returns {SearchType} The type of search being performed.
   */
  get getSearchType() {
    return this.filters()['endPoint'];
  }

    /**
   * Updates the query of the list of characters based on the given query.
   * @param {string} query - The query to search for.
   */
  setQuery(query: string) {
    this.filters.update((curr) => ({ ...curr, name: query, page: '1' }));
  }

    /**
   * Updates the page of the list of characters based on the given callback function.
   * @param {function(page?: number): number} callback - A function that takes a page number as an argument and returns a new page number.
   */
  updatePage(callback: (page?: number) => number) {
    this.filters.update((curr) => {
      const newPage = callback(parseInt(curr['page']));
      return { ...curr, page: newPage.toString() };
    });
  }

  /**
   * Returns a list of characters from the Marvel API
   * @returns {Observable<Character[]>} An Observable that emits a list of characters
   */
  private getCharacters(): void {
    const firstPage = this.filters()['page'] == '1';
    if (firstPage) {
      this.state.set(State.Loading);
    }

    const params: HttpParams = new HttpParams({
      fromObject: {
        ...this.filters(),
        name: this.ids() ? "" : this.filters()["name"] || ""
      },
    });
    console.log(this.ids());

    const searchType =
      env.searchDomains[this.filters()['endPoint'] as SearchType];

    this.http.get<Response<any>>(searchType + (this.ids() ? "/" + this.ids() : ""), { params }).subscribe({
      next: (response) => {
        this.state.set(State.Loaded);
        if (firstPage) {
          this.list.set(response.results || response);
        } else {
          this.list.update((curr) => [...curr, ...(response.results || response)]);
        }
      },
      error: (error) => {
        this.state.set(State.Error);
        console.log(error);
      },
    });
  }
}
