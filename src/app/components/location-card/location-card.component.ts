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

  /**
 * @param {Location} data - the location object that contains the information about the location
 * @description
 * This function is triggered when the user clicks on the location card. It uses the Router to navigate to the Personajes page,
 * passing along the necessary query parameters to filter the results by location.
 */
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
