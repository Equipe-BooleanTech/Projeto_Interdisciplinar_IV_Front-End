export interface SupplierDto {  
    id?: string;
    name: string;
    cnpj: string;
    contact: string;
    phone: string;
}

export interface RegisterSupplierDto extends SupplierDto {}

export interface UpdateSupplierDto extends SupplierDto { }

export interface DeleteSupplierDto {
    id: string;
}

export interface GetSupplierDto {
    id: string;
}

export interface ListSupplierDto {}

export interface SupplierResponseDto {
    statusCode: number;
    message: string;
}

export interface SupplierListResponseDto {
    suppliers: SupplierResponseDto[];
}