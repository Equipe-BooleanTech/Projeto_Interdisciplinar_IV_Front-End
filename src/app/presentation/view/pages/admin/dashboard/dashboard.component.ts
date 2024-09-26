import { Component } from '@angular/core';
import { SidebarComponent, CardComponent } from '@presentation/view/components';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [SidebarComponent, CardComponent],
    templateUrl: './dashboard.component.html',
    styles: ``,
})
export class DashboardComponent {}
