import { Component } from '@angular/core';
import { LineColumnComponent } from '@presentation/view/components/chart';
import { CardComponent } from "../../../../components/card/card.component";
import { SidebarComponent } from "../../../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-painel-contador',
  standalone: true,
  imports: [SidebarComponent, LineColumnComponent, CardComponent],
  templateUrl: './painel-contador.component.html',
  styles: ``
})
export class PainelContadorComponent {

}
