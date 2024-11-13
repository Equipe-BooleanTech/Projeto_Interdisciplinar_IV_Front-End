import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollaboratorDto, PaginatedResponse } from '@domain/dtos';
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

    listCollaboratorPerTime(): Observable<CollaboratorDto[]> {
        return this.listPerTime(
            `${this.apiBase}/api/users/list-users-by-period`,
            {
                startDate: (new Date().getMonth() - 1).toString(),
                endDate: new Date().getMonth().toString(),
            },
        );
    }
}
