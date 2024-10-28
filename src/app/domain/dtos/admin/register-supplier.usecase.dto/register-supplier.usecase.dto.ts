export interface RegisterSupplierDto {
    name: string;
    cnpj: string;
    contact: string;
    phone: string;
}

export interface RegisterSupplierResponseDto {
    statusCode: number;
    message?: string;
}