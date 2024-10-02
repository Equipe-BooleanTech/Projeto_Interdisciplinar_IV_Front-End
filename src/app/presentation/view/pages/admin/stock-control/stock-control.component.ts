import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-stock-control',
  standalone: true,
  imports: [SidebarComponent, CardComponent, ButtonComponent],
  templateUrl: './stock-control.component.html',
  styles: ``
})
export class StockControlComponent {

}
