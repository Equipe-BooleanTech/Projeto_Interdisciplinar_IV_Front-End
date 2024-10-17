import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { sidebarData } from '@domain/static/data';
import { SidebarItem } from '@domain/static/interfaces';
import { SidebarService } from '@domain/static/services';
import { BehaviorSubject } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
    isOpen$ = this._sidebarService.isOpen$;
    sidebarItems: SidebarItem[] = sidebarData.data;
    isShowing: boolean = true;
    viewHeight = new BehaviorSubject<string | number>('100vh');

    constructor(private _sidebarService: SidebarService) {}

    ngOnInit(): void {
        this.setViewHeight();
        this.isOpen$.subscribe((isOpen) => {
            this.isShowing = isOpen;
            this.setViewHeight();
        });
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
        this.sidebarItems.reduce((currentItem) => {
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
}
