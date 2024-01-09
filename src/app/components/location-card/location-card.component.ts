import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.sass'
})
export class LocationCardComponent {
  @Input() data!: Location;

  constructor(private router: Router){}

  onClick(data: Location): void {

    const ids = data.residents.map(e =>  e.split("/").at(-1));

    this.router.navigate(['/personajes'], {
      queryParams: {
        ids: ids.join(","),
        name: data.name,
        from: "ubicacion"
      }
    });
    
  
  }
}
