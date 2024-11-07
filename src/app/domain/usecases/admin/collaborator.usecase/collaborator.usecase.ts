import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    CollaboratorDto,
    CollaboratorResponseDto,
    CreateCollaboratorDto,
    DeleteCollaboratorDto,
    GetAllCollaboratorsDto,
    GetCollaboratorDto,
    UpdateCollaboratorDto,
    
} from '@domain/dtos';
import { CollaboratorRepositoryUseCase } from '@domain/repositories';
import { Observable, BehaviorSubject, throwError, interval } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

import { API_URL, ErrorService } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorUseCase implements CollaboratorRepositoryUseCase {
    private apiBase = API_URL;
    private collaboratorsSubject = new BehaviorSubject<CollaboratorDto[]>([]);
    collaborators$ = this.collaboratorsSubject.asObservable();

    constructor(
        private _http: HttpClient,
        private _errorService: ErrorService,
    ) {}

    getAllCollaborators(
        page: number,
        size: number,
    ): Observable<GetAllCollaboratorsDto> {
        return this._http
            .get<GetAllCollaboratorsDto>(
                `${this.apiBase}/api/users/get-users?page=${page}&size=${size}`,
            )
            .pipe(
                tap((response) =>
                    this.collaboratorsSubject.next(response.content),
                ),
                catchError(this._errorService.handleError),
            );
    }

    getCollaborator(id: string): Observable<CollaboratorDto> {
        return this._http.get<CollaboratorDto>(
            `${this.apiBase}/api/collaborators/get-collaborator/${id}`
        ).pipe(
            catchError(this._errorService.handleError)
        );
    }
    
    createCollaborator(
        collaborator: CollaboratorDto,
    ): Observable<CollaboratorDto> {
        return this._http.post<CollaboratorDto>(
            `${this.apiBase}/api/collaborators/create-collaborator`,
            collaborator,
        );
    }

    updateCollaborator(
        collaborator: CollaboratorDto,
        id: string,
    ): Observable<CollaboratorDto> {
        return this._http.put<CollaboratorDto>(
            `${this.apiBase}/api/collaborators/update-collaborator/${id}`,
            collaborator,
        );
    }

    deleteCollaborator(id: string): Observable<CollaboratorResponseDto> {
        return this._http.delete<CollaboratorResponseDto>(
            `${this.apiBase}/api/collaborators/delete-collaborator/${id}`,
            {},
        );
    }
}
