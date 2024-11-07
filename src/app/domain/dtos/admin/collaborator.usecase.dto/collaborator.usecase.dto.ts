export interface CollaboratorDto {
    email: string;
    fullName: string;
    phone: string;
    cpf: string;
    cep: string;
    address: string;
    addressNumber: string;
    city: string;
    state: string;
    neighborhood: string;
    cnpj: string;
    message: string;
    enterprise: string;
    password: string;
    roles: string;
    isProspecting: boolean;
    isEmployee: boolean;
}

export interface CollaboratorResponseDto{
    statusCode: number;
    message?: string;
}

// GET (By Id)
export interface GetCollaboratorDto{
    id: string;
}

// Get (All)
export interface GetAllCollaboratorsDto {
    content: CollaboratorDto[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

// POST
export interface CreateCollaboratorDto {
    collaborator: CollaboratorDto;
}

// PUT
export interface UpdateCollaboratorDto {
    id: string;
    collaborator: CollaboratorDto;
}

// DELETE
export interface DeleteCollaboratorDto {
    id: string;
}