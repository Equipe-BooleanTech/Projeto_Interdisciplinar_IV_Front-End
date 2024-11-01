import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeleteIngredientDto, GetIngredientDto, IngredientDto, IngredientResponseDto, RegisterIngredientDto, UpdateIngredientDto } from "@domain/dtos";
import { IngredientRepository } from "@domain/repositories";
import { Observable } from "rxjs";
import { API_URL } from "src/app/shared";

@Injectable({
    providedIn: 'root',
})
export class IngredientsUseCase implements IngredientRepository {

    private apiBase = API_URL;

    constructor(private _http: HttpClient) {}

    getIngredients(): Observable<IngredientDto[]> {
        return this._http.get<IngredientDto[]>(`${this.apiBase}/api/products/get-ingredients`);
    }

    getIngredient(ingredient: GetIngredientDto): Observable<IngredientDto> {
        return this._http.get<IngredientDto>(`${this.apiBase}/api/products/get-ingredient/${ingredient.id}`);
    }

    createIngredient(ingredient: RegisterIngredientDto): Observable<IngredientResponseDto> {
        return this._http.post<IngredientResponseDto>(`${this.apiBase}/api/products/create-ingredient`, ingredient);
    }

    updateIngredient(ingredient: UpdateIngredientDto): Observable<IngredientResponseDto> {
        return this._http.put<IngredientResponseDto>(`${this.apiBase}/api/products/update-ingredient/${ingredient.id}`, ingredient);
    }

    deleteIngredient(ingredient: DeleteIngredientDto): Observable<IngredientResponseDto> {
        return this._http.delete<IngredientResponseDto>(`${this.apiBase}/api/products/delete-ingredient/${ingredient.id}`, {});
    }
}
