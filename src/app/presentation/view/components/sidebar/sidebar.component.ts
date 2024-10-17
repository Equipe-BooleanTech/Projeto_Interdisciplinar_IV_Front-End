import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
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
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    isOpen$ = this._sidebarService.isOpen$;
    sidebarItems: SidebarItem[] = sidebarData.data;
    isShowing: boolean = true;
    viewHeight = new BehaviorSubject<string | number>('100vh');
    private resizeObserver: ResizeObserver | undefined;

    constructor(private _sidebarService: SidebarService, private elRef: ElementRef) {}

    ngOnInit(): void {
        this.isOpen$.subscribe((isOpen) => {
            this.isShowing = isOpen;
            this.getScreenHeight();
        });
    }

    ngAfterViewInit(): void {
        
    }

    ngOnDestroy(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
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

    getScreenHeight(): string {
        return document.body.style.height;
    }
}