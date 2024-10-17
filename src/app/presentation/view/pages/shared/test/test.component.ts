import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CardComponent, SidebarComponent],
    templateUrl: './test.component.html',
    styles: ``,
})
export class TestComponent {}
