import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollaboratorDto, PaginatedResponse } from '@domain/dtos';
import { CollaboratorRepositoryUseCase } from '@domain/repositories';
import { ErrorService, BaseUseCase } from "@domain/base"
import {API_URL} from '@shared/constants'

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

    registerCollaborator(data: CollaboratorDto): Observable<CollaboratorDto> {
        return this.create(`${this.apiBase}/api/users/create-complete`, data)
    }
    
}