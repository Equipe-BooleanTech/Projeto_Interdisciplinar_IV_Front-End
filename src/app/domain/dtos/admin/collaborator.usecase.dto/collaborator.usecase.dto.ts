export interface CollaboratorDto {
    id?: string;
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

export interface CollaboratorResponseDto {
    message?: string;
}
