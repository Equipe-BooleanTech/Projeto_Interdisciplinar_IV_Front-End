import { DeleteIngredientDto, GetIngredientDto, IngredientDto, IngredientResponseDto, RegisterIngredientDto, UpdateIngredientDto } from "@domain/dtos";
import { Observable } from "rxjs";

export interface IngredientRepository {
    getIngredients(): Observable<IngredientDto[]>;
    getIngredient(where: GetIngredientDto): Observable<IngredientDto>;
    createIngredient(ingredient: RegisterIngredientDto): Observable<IngredientResponseDto>;
    updateIngredient(ingredient: UpdateIngredientDto): Observable<IngredientResponseDto>;
    deleteIngredient(where: DeleteIngredientDto): Observable<IngredientResponseDto>;

    }