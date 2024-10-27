import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterIngredientDto, RegisterIngredientResponseDto } from '@domain/dtos';
import { RegisterIngredientUseCaseRepository } from '@domain/repositories/admin/register-ingredient';
import { map, Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class RegisterIngredientUseCase
    implements RegisterIngredientUseCaseRepository
{
    public apiBase = API_URL;
    constructor(private _http: HttpClient) {}
    registerColaborattor(data: RegisterIngredientDto): Observable<RegisterIngredientResponseDto> {
        throw new Error('Method not implemented.');
    }
    registerIngredient(
        data: RegisterIngredientDto,
    ): Observable<RegisterIngredientResponseDto> {
       
        const response = this._http
            .post<RegisterIngredientResponseDto>(
                `${this.apiBase}/api/products/create-ingredient`,
                data,
                {
                    observe: 'response',
                },
            )
            .pipe(
                map(
                    (
                        response: HttpResponse<RegisterIngredientResponseDto>,
                    ) => {
                        const finalResponse: RegisterIngredientResponseDto = {
                            statusCode: response.status,
                            message: response?.body?.message,
                        };
                        return finalResponse;
                    },
                ),
            );
        return response;
    }
}
