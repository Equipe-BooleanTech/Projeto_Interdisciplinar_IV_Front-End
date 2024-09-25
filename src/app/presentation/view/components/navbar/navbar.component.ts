import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    isOpen: boolean = false;
    navLinks = [
        { name: 'Início', url: '#inicio' },
        { name: 'Funcionalidades', url: '#funcionalidades' },
        { name: 'Contato', url: '#contato' },
    ];

    toggleMenu(): void {
        this.isOpen = !this.isOpen;
    }
}
