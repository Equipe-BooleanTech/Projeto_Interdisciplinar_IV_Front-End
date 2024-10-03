import { OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sidebarData } from '@infra/data';
import { BehaviorSubject } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
    sidebarItems = sidebarData.sidebarItems;
    isExpanded: boolean = true;
    isSidebarVisible: boolean = false;
    viewHeight = new BehaviorSubject<string | number>('100vh');

    ngOnInit(): void {
        this.setViewHeight();
    }

    setViewHeight(): void {
        this.viewHeight.next(document.body.scrollHeight);
    }

    toggleSidebar(): void {
        this.isExpanded = !this.isExpanded;
        this.setViewHeight();
    }
}
