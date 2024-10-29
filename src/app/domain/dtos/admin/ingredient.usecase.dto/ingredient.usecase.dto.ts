import { SupplierDto } from "@domain/dtos";

export interface IngredientDto {  
    id?: string;
    name: string;
    supplier: SupplierDto;
    price: number;
    unit: string;
    quantity: string;
    description: string;
    isAnimalOrigin: boolean;
    sif: string;
}

export interface RegisterIngredientDto extends IngredientDto {}

export interface UpdateIngredientDto extends IngredientDto { }

export interface DeleteIngredientDto {
    id: string;
}

export interface GetIngredientDto {
    id: string;
}

export interface ListIngredientDto {}

export interface IngredientResponseDto {
    statusCode: number;
    message: string;
}

export interface IngredientListResponseDto {
    suppliers: ListIngredientDto[];
}