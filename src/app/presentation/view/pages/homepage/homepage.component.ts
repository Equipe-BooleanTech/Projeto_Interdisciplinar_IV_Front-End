import { Component } from '@angular/core';
import { HomepageLayoutComponent } from '@presentation/view/layouts';


@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [HomepageLayoutComponent],
    templateUrl: './homepage.component.html',
    styles: ``,
})
export class HomepageComponent {
}
