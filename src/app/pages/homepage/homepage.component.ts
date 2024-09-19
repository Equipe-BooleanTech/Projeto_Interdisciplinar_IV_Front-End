import { Component } from '@angular/core';
import { CardComponent } from '@lib/components';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './homepage.component.html',
    styles: ``,
})
export class Homepage {}
