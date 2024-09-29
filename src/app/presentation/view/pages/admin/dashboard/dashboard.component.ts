import { Component } from '@angular/core';
import { SidebarComponent, CardComponent } from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { TableComponent } from "../../../components/table/table.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [SidebarComponent, CardComponent, LineColumnComponent, TableComponent],
    templateUrl: './dashboard.component.html',
    styles: ``,
})
export class DashboardComponent {}
