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
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorUseCase implements CollaboratorRepositoryUseCase {
    private apiBase = API_URL;

    constructor(private _http: HttpClient) {}
    
    getAllCollaborators(): Observable<GetAllCollaboratorsDto> {
        return this._http.get<GetAllCollaboratorsDto>(
            `${this.apiBase}/api/users/get-users`,
        );
    }

    getCollaborator(id: string): Observable<CollaboratorDto> {
        return this._http.get<CollaboratorDto>(`${this.apiBase}/api/collaborators/get-collaborator/${id}`);
    }

    createCollaborator(collaborator: CollaboratorDto): Observable<CollaboratorDto> {
        return this._http.post<CollaboratorDto>(`${this.apiBase}/api/collaborators/create-collaborator`, collaborator);
    }

    updateCollaborator(collaborator: CollaboratorDto, id: string): Observable<CollaboratorDto> {
        return this._http.put<CollaboratorDto>(`${this.apiBase}/api/collaborators/update-collaborator/${id}`, collaborator);
    }

    deleteCollaborator(id: string): Observable<CollaboratorResponseDto> {
        return this._http.delete<CollaboratorResponseDto>(`${this.apiBase}/api/collaborators/delete-collaborator/${id}`, {});
    }


}
