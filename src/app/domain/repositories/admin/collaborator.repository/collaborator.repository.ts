import { CollaboratorDto, GetAllCollaboratorsDto } from "@domain/dtos";
import { Observable } from "rxjs";

export interface CollaboratorRepositoryUseCase {
    //GET (ALL)
    getAllCollaborators(page: number, size: number): Observable<GetAllCollaboratorsDto>;
    //GET (BY ID)
    getCollaborator(id: string): Observable<CollaboratorDto>;
    //POST
    createCollaborator(collaborator: CollaboratorDto): Observable<CollaboratorDto>;
    //PUT
    updateCollaborator(collaborator: CollaboratorDto, id: string): Observable<CollaboratorDto>;
    //DELETE
    deleteCollaborator(id: string): Observable<{}>;
}