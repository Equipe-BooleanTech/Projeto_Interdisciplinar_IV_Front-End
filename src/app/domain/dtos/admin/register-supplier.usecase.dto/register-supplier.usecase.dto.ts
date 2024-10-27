export interface RegisterSupplierDto {
    name: String;
    cnpj: String;
    contact: String;
    phone: String;
}

export interface RegisterSupplierResponseDto {
    statusCode: number;
    message?: string;
}