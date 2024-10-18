import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-fichas-tecnicas',
  standalone: true,
  imports: [SidebarComponent, CardComponent, ButtonComponent],
  templateUrl: './fichas-tecnicas.component.html',
  styles: ``
})
export class FichasTecnicasComponent {

}
