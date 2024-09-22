import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@presentation/view/components';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavbarComponent, RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
