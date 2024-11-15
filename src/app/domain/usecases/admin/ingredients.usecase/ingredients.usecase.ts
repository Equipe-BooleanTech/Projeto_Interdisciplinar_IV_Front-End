import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    IngredientDto,
    ListByPeriodDto,
    ListByPeriodResponse,
    PaginatedResponse,
} from '@domain/dtos';
import { Observable, map, catchError } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class IngredientsUseCase extends BaseUseCase<IngredientDto> {
    private apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }
    getIngredients(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<IngredientDto>> {
        return this.getAll(
            `${this.apiBase}/api/products/get-ingredients`,
            page,
            size,
        );
    }

    getIngredientById(id: string): Observable<IngredientDto> {
        return this.getById(
            `${this.apiBase}/api/products/get-ingredient-by-id/${id}`,
            id,
        );
    }

    registerIngredient(data: IngredientDto): Observable<IngredientDto> {
        return this.create(
            `${this.apiBase}/api/products/create-ingredient`,
            data,
        );
    }

    listIngredientsPerWeek(): Observable<ListByPeriodResponse<IngredientDto>> {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 7);

        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = currentDate.toISOString().split('T')[0];

        return this.listPerPeriod(
            `${this.apiBase}/api/products/list-ingredients-by-period`,
            { startDate: startDateString, endDate: endDateString },
            'groupingType=week',
        ).pipe(
            map((response: ListByPeriodResponse<IngredientDto>) => response),
        );
    }
}
