import { RegisterSupplierDto } from "../register-supplier.usecase.dto/register-supplier.usecase.dto";

export interface RegisterIngredientDto {
    name: string;
    unit: string;
    price: string;
    quantity: string;
    description: string;
    sif?: string;
    supplier: RegisterSupplierDto;
}

export interface RegisterIngredientResponseDto {
    statusCode: number;
    message?: string;
}