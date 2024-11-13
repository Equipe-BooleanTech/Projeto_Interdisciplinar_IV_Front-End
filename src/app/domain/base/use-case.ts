import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService, BaseUseCaseRepository } from '.';
import { PaginatedResponse } from '@domain/dtos';

@Injectable({
    providedIn: 'root',
})
export class BaseUseCase<Entity> implements BaseUseCaseRepository<Entity> {
    public baseSubject = new BehaviorSubject<Entity[]>([]);
    public base$ = this.baseSubject.asObservable();

    constructor(
        private _http: HttpClient,
        private _errorService: ErrorService,
    ) {}

    getAll(
        url: string,
        page: number,
        size: number,
    ): Observable<PaginatedResponse<Entity>> {
        return this._http
            .get<PaginatedResponse<Entity>>(`${url}?page=${page}&size=${size}`)
            .pipe(
                tap((response) => this.baseSubject.next(response.content)),
                catchError((error: HttpErrorResponse) => {
                    this._errorService.handleError(error);
                    return throwError(error);
                }),
            );
    }

    getById(url: string, id: string): Observable<Entity> {
        return this._http.get<Entity>(`${url}/${id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                this._errorService.handleError(error);
                return throwError(error);
            }),
        );
    }

    create(url: string, data: Entity): Observable<Entity> {
        return this._http.post<Entity>(`${url}`, data).pipe(
            catchError((error: HttpErrorResponse) => {
                this._errorService.handleError(error);
                return throwError(error);
            }),
        );
    }

    listPerTime(url: string, timeRangePath?: string): Observable<Entity[]> {
        return this._http
            .get<
                Entity[]
            >(`${url}${timeRangePath !== undefined ? `?${timeRangePath}` : ''}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this._errorService.handleError(error);
                    return throwError(error);
                }),
            );
    }
    /* 
    update(url: string, data: Entity, id: string): Observable<Entity> {
        throw new Error('Method not implemented.');
    }
    delete(url: string, id: string): Observable<Entity> {
        throw new Error('Method not implemented.');
    }
        */
}
