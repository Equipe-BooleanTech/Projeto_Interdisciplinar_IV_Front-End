import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private _isSidebarOpenSubject = new BehaviorSubject<boolean>(true);
    isOpen$ = this._isSidebarOpenSubject.asObservable();

    toggleSidebar(): void {
        this._isSidebarOpenSubject.next(!this._isSidebarOpenSubject.value);
    }
}