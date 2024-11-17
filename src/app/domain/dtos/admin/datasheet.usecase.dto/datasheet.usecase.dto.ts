import { IngredientDto } from '@domain/dtos';

export interface DataSheetDto {
    id?: string;
    name: string;
    ingredients: IngredientDto[];
    time: string;
    yieldPerPortion: string;
    finalCost: string;
    totalYields: string;
    createdAt?: string;
}
