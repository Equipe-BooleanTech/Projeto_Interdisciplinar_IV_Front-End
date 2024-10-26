import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    RegisterColaborattorDto,
    RegisterColaborattorResponseDto,
} from '@domain/dtos';
import { RegisterColaborattorUseCaseRepository } from '@domain/repositories';
import { map, Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class RegisterColaborattorUseCase
    implements RegisterColaborattorUseCaseRepository
{
    public apiBase = API_URL;
    constructor(private _http: HttpClient) {}
    registerColaborattor(
        data: RegisterColaborattorDto,
    ): Observable<RegisterColaborattorResponseDto> {
        const response = this._http
            .post<RegisterColaborattorResponseDto>(
                `${this.apiBase}/api/users/create-complete`,
                data,
                {
                    withCredentials: true,
                    observe: 'response',
                },
            )
            .pipe(
                map(
                    (
                        response: HttpResponse<RegisterColaborattorResponseDto>,
                    ) => {
                        const finalResponse: RegisterColaborattorResponseDto = {
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
