import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@presentation/view/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavbarComponent, RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
})
export class AppComponent  {
    
}
