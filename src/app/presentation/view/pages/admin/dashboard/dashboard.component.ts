import { Component } from '@angular/core';
import { SidebarComponent } from '@presentation/view/components';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [SidebarComponent],
    templateUrl: './dashboard.component.html',
    styles: ``,
})
export class DashboardComponent {}
