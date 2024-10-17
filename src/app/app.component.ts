import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { services } from '@domain/static/services';
import {
    FooterComponent,
    NavbarComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterOutlet, CommonModule],
    providers: [...services],
    templateUrl: './app.component.html',
})
export class AppComponent {}
