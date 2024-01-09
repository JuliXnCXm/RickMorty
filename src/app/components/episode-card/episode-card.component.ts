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
