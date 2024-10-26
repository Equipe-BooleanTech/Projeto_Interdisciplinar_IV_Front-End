import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@presentation/view/components';
import { SidebarService } from '@domain/static/services';
import { AuthenticateUseCase } from '@domain/usecases';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    isNavbarOpen: boolean = false;
    isAuthenticated: boolean = this._authUseCase.isLoggedIn();

    constructor(
        private _sidebarService: SidebarService,
        private _authUseCase: AuthenticateUseCase,
    ) {}

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

    getLink(): string {
        return this.isAuthenticated ? '' : '/login';
    }

    handleClick(): void {
        if (this.isAuthenticated) {
            this._authUseCase.logout();
            alert('Até breve!');
            window.location.reload();
        }
    }
}
