import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ErrorService, BaseUseCaseRepository } from '.';
import {
    PaginatedResponse,
    ListByPeriodDto,
    ListByPeriodResponse,
} from '@domain/dtos';

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

    listPerPeriod(
        url: string,
        timeRange: ListByPeriodDto,
        timeRangePath?: string,
    ): Observable<ListByPeriodResponse<Entity>> {
        return this._http
            .post<{
                data: Entity[][];
                total: number;
            }>(`${url}${timeRangePath ? `?${timeRangePath}` : ''}`, timeRange)
            .pipe(
                map((response) => {
                    const flattenedItems = response.data.flat();

                    if (
                        response.total !== undefined &&
                        Array.isArray(flattenedItems)
                    ) {
                        return {
                            total: response.total,
                            items: flattenedItems,
                        } as ListByPeriodResponse<Entity>;
                    } else {
                        throw new Error('Invalid response format');
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this._errorService.handleError(error);
                    return throwError(error);
                }),
            );
    }

    update(url: string, data: Entity, id: string): Observable<Entity> {
        return this._http.put<Entity>(`${url}/${id}`, data).pipe(
            catchError((error: HttpErrorResponse) => {
                this._errorService.handleError(error);
                return throwError(error);
            }),
        );
    }
    delete(url: string, id: string): Observable<Entity> {
        return this._http.delete<Entity>(`${url}/${id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                this._errorService.handleError(error);
                return throwError(error);
            }),
        );
    }
}
