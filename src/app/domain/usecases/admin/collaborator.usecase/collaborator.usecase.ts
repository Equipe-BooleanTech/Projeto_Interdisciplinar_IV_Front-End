import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';
import {
    CollaboratorDto,
    PaginatedResponse,
    ListByPeriodResponse,
    ListByPeriodDto,
    SupplierDto,
} from '@domain/dtos';
import { ErrorService, BaseUseCase } from '@domain/base';
import { API_URL } from '@shared/constants';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorUseCase extends BaseUseCase<CollaboratorDto> {
    private apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }

    getAllCollaborators(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<CollaboratorDto>> {
        return this.getAll(`${this.apiBase}/api/users/get-users`, page, size);
    }

    getCollaboratorById(id: string): Observable<CollaboratorDto> {
        return this.getById(`${this.apiBase}/api/users/get-users-by-id`, id);
    }

    registerCollaborator(data: CollaboratorDto): Observable<CollaboratorDto> {
        return this.create(`${this.apiBase}/api/users/create-complete`, data);
    }

    listCollaboratorsPerWeek(
        period?: ListByPeriodDto,
    ): Observable<ListByPeriodResponse<CollaboratorDto>> {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 7);

        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = currentDate.toISOString().split('T')[0];

        if (period) {
            return this.listPerPeriod(
                `${this.apiBase}/api/products/list-users-by-period`,
                period,
                'groupingType=week',
            ).pipe(
                map(
                    (response: ListByPeriodResponse<CollaboratorDto>) =>
                        response,
                ),
            );
        }
        return this.listPerPeriod(
            `${this.apiBase}/api/users/list-users-by-period`,
            { startDate: startDateString, endDate: endDateString },
            'groupingType=week',
        ).pipe(
            map((response: ListByPeriodResponse<CollaboratorDto>) => response),
        );
    }

    updateCollaborator(
        id: string,
        data: CollaboratorDto,
    ): Observable<CollaboratorDto> {
        return this.update(`${this.apiBase}/api/users/update`, data, id);
    }

    deleteCollaborator(id: string): Observable<CollaboratorDto> {
        return this.delete(`${this.apiBase}/api/users/delete`, id);
    }
}
