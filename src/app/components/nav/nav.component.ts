import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

RouterLink

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.sass'
})
export class NavComponent {
  navItem = [
    "Ubicaciones",
    "Episodios",
    "Personajes",
  ]
}
