import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { PainelContadorComponent } from './painel-contador/painel-contador.component';

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [PainelContadorComponent, SidebarComponent],
  templateUrl: './cash-flow.component.html',
  styles: ``
})
export class CashFlowComponent {

}
