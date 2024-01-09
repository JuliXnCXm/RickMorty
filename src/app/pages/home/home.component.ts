import { Component, OnInit, signal } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { InputSearcherComponent } from '../../components/input-searcher/input-searcher.component';
import { CharacterListComponent } from '../../components/list/list.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    InputSearcherComponent,
    CharacterListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})

/**
 * @classdesc
 * The HomeComponent class is responsible for managing the home page.
 * It contains the navigation bar, the search bar, and the character list.
 * It also listens to the router events and updates the current URL.
 */

export class HomeComponent {
  currentUrl: string = '';
  complement: string = '';

  /**
   * Creates an instance of the HomeComponent.
   * @param {Router} router - The router service.
   * @param {ActivatedRoute} activeRouter - The activated route service.
   */
  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    /**
     * Subscribes to the query param map of the activated route.
     * If the 'from' param is 'episodio', sets the complement to ' en el episodio [name]'.
     * If the 'from' param is 'ubicacion', sets the complement to ' en la ubicacion [name]'.
     * Otherwise, sets the complement to an empty string.
     */
    this.activeRouter.queryParamMap.subscribe((params) => {
      if (params.get('from') == "episodio") {
        this.complement = ` en el episodio ${params.get('name')}`
      } else if (params.get('from') == "ubicacion"){
        this.complement = ` en la ubicacion ${params.get('name')}`
      } else {
        this.complement = "";
      }
    });
     /**
     * Subscribes to the router events.
     * When a NavigationEnd event is triggered, extracts the primary segment of the current URL.
     * Then, matches the URL against the possible values of 'personajes', 'episodios', or 'ubicaciones'.
     * The matched value is set as the current URL.
     */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const path =
          this.router.getCurrentNavigation()?.extractedUrl.root.children[
            'primary'
          ].segments[0].path || '';
        const curr =
          path?.match(/personajes|episodios|ubicaciones/g)?.at(0) ||
          'personajes';
        this.currentUrl = curr;
      });
  }
}
