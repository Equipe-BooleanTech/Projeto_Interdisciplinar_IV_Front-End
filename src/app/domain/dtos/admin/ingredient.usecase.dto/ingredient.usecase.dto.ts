import { SupplierDto } from "@domain/dtos";

export interface IngredientDto {  
    id?: string;
    name: string;
    supplier: SupplierDto[];
    price: number;
    unit: string;
    quantity: string;
    description: string;
    isAnimalOrigin: boolean;
    sif: string;
}

export interface IngredientResponseDto  {
    message?: string;

}

