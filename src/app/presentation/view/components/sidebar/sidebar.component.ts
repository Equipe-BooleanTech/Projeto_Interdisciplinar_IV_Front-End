import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sidebarData } from '@infra/data';

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    imports: [CommonModule],
})
export class SidebarComponent {
    sidebarItems = sidebarData.sidebarItems;

    isExpanded: boolean = true;

    toggleSidebar(): void {
        this.isExpanded = !this.isExpanded;
    }
}
