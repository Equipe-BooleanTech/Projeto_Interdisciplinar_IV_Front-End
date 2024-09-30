import { Component } from '@angular/core';
import { CardComponent } from '@presentation/view/components';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [SidebarComponent, LineColumnComponent, CardComponent],
  templateUrl: './cash-flow.component.html',
  styles: ``
})
export class CashFlowComponent {

}
