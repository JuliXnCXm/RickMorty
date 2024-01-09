import { CommonModule } from '@angular/common';
import env from '../../../enviroment/enviroment';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.sass'
})
export class NavComponent {
  navItem = env.navItems;
  @Input() current: string = "";
}
