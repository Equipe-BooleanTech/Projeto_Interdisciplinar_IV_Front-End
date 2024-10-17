import { Component } from '@angular/core';
import {
    ButtonComponent,
    CardComponent,
    SidebarComponent,
} from '@presentation/view/components';

@Component({
    selector: 'app-financas',
    standalone: true,
    imports: [SidebarComponent, CardComponent, ButtonComponent],
    templateUrl: './financas.component.html',
    styles: ``,
})
export class FinancasComponent {}
