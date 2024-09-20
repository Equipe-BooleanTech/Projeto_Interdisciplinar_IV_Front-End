import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataTransferService {
    private _dataSource = new BehaviorSubject<object | any>(null); // Comparado com o React, é como se fosse um contexto
    currentData = this._dataSource.asObservable();
    constructor() {}

    setData(data: any): void {
        this._dataSource.next(data);
    }
}
