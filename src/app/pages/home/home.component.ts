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
export class HomeComponent {
  currentUrl: string = '';
  complement: string = '';

  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    this.activeRouter.queryParamMap.subscribe((params) => {
      if (params.get('from') == "episodio") {
        this.complement = ` en el episodio ${params.get('name')}`
      } else if (params.get('from') == "ubicacion"){
        this.complement = ` en la ubicacion ${params.get('name')}`
      } else {
        this.complement = "";
      }
    });
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
