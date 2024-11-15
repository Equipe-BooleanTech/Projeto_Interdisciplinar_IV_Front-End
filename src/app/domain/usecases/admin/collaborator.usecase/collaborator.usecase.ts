import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';
import {
    CollaboratorDto,
    PaginatedResponse,
    ListByPeriodResponse,
    ListByPeriodDto,
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

    listCollaboratorPerTime(
        timeRange: ListByPeriodDto,
    ): Observable<CollaboratorDto[]> {
        return this.listPerPeriod(
            `${this.apiBase}/api/users/list-users-by-period`,
            timeRange,
        ).pipe(
            map(
                (response: ListByPeriodResponse<CollaboratorDto>) =>
                    response.items,
            ),
        );
    }
}
