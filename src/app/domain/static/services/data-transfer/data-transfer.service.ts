// src/app/infra/services/data-transfer.service.ts
import { Injectable } from '@angular/core';
import { Homepage } from '@domain/static/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataTransferService {
    private _dataSubject = new BehaviorSubject<Homepage | null>(null);
    currentData = this._dataSubject.asObservable();

    setData(data: Homepage): void {
        this._dataSubject.next(data);
    }

    getData(): Homepage | null {
        return this._dataSubject.getValue();
    }
}
