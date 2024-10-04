import { Component } from '@angular/core';
import {
    CardComponent,
    SidebarComponent,
    TableComponent,
} from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        SidebarComponent,
        CardComponent,
        LineColumnComponent,
        TableComponent,
    ],
    templateUrl: './orders.component.html',
    styles: ``,
})
export class OrdersComponent {}