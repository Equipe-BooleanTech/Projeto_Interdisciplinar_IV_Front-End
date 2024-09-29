import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-components-layout',
  standalone: true,
  imports: [TableComponent, SidebarComponent],
  templateUrl: './components-layout.component.html',
  styles: ``
})
export class ComponentsLayoutComponent {

}
