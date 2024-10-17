import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@presentation/view/components';
import { SidebarService } from '@domain/static/services';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    isNavbarOpen: boolean = false;
    isAuthenticated: boolean = true;

    constructor(private _sidebarService: SidebarService) {}

    navLinks = [
        { name: 'Início', url: '#inicio' },
        { name: 'Funcionalidades', url: '#funcionalidades' },
        { name: 'Contato', url: '#contato' },
    ];

    toggleMenu(): void {
        if (this.isAuthenticated) {
            this._sidebarService.toggleSidebar();
        } else {
            this.isNavbarOpen = !this.isNavbarOpen;
        }
    }
}
