export interface RegisterColaborattorDto {
    email: string;
    name: string;
    phone: string;
    CPF: string;
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
    function: string;
}

export interface RegisterColaborattorResponseDto {
    statusCode: number;
    message?: string;
}