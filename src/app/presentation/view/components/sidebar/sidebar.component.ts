import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sidebarData } from '@infra/data';
import { BehaviorSubject } from 'rxjs';
import { SidebarItem } from '@domain/interfaces';

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
    sidebarItems: SidebarItem[] = sidebarData.data;
    isShowing: boolean = true;
    isSidebarExpanded: boolean = true;
    viewHeight = new BehaviorSubject<string | number>('100vh');

    ngOnInit(): void {
        this.setViewHeight();
    }

    openMobileSidebar(): void {
        this.isShowing = true;
    }

    closeMobileSidebar(): void {
        this.isShowing = false;
    }

    toggleSubItems(item: SidebarItem, event: Event): void {
        if (!item.isExpanded) {
            event.preventDefault();
        }
        this.sidebarItems.reduce((previousState, currentItem) => {
            if (currentItem !== item) {
                currentItem.isExpanded = false;
            }
            return currentItem;
        });
        item.isExpanded = true;
    }

    getItemLink(item: SidebarItem): string {
        if (item.isExpanded) {
            return item.link;
        }
        return '';
    }

    setViewHeight(): void {
        this.viewHeight.next(document.body.scrollHeight);
    }

    toggleSidebar(): void {
        this.isSidebarExpanded = !this.isSidebarExpanded;
        this.setViewHeight();
    }
}
