import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  navLinks = [
    {"name": "Início", "url": "#inicio"},
    {"name": "Funcionalidade", "url": "#funcionalidade"},
    {"name": "Contato", "url": "#contato"}
  ]

}
