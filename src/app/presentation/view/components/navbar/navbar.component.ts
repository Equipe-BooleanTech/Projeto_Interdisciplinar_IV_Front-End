import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    navLinks = [
        { name: 'Início', url: '#inicio' },
        { name: 'Funcionalidades', url: '#funcionalidades' },
        { name: 'Contato', url: '#contato' },
    ];
}
