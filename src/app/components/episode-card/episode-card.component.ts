import { Component, Input } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.sass'
})
export class EpisodeCardComponent {
  @Input() data!: Episode;

  constructor(private router: Router){}

  /**
 * @param {Episode} data 
 * @description This function is triggered when the user clicks on the episode card. It logs the clicked episode in the console and navigates to the character list page with the list of characters from the clicked episode as a query parameter.
 */
onClick(data: Episode): void {
  console.log(data);

  const ids = data.characters.map(e =>  e.split("/").at(-1));

  this.router.navigate(['/personajes'], {
    queryParams: {
      ids: ids.join(","),
      name: data.name,
      from: "episodio"
    }
  });

}
}
