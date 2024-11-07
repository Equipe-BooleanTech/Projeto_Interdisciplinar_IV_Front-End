import { CollaboratorDto, PaginatedResponse } from "@domain/dtos";
import { Observable } from "rxjs";

export interface CollaboratorRepositoryUseCase {
    //GET (ALL)
    getAllCollaborators(page: number, size: number): Observable<PaginatedResponse<CollaboratorDto>>;
    //GET (BY ID)
    getCollaborator(id: string): Observable<CollaboratorDto>;
    //POST
    createCollaborator(collaborator: CollaboratorDto): Observable<CollaboratorDto>;
    //PUT
    updateCollaborator(collaborator: CollaboratorDto, id: string): Observable<CollaboratorDto>;
    //DELETE
    deleteCollaborator(id: string): Observable<{}>;
}