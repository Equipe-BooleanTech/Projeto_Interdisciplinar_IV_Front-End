import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterSupplierDto, RegisterSupplierResponseDto } from '@domain/dtos';
import { RegisterSupplierUseCaseRepository } from '@domain/repositories/admin/register-supplier';
import { map, Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class RegisterSupplierUseCase
    implements RegisterSupplierUseCaseRepository
{
    public apiBase = API_URL;
    constructor(private _http: HttpClient) {}
    registerColaborattor(data: RegisterSupplierDto): Observable<RegisterSupplierResponseDto> {
        throw new Error('Method not implemented.');
    }
    registerSupplier(
        data: RegisterSupplierDto,
    ): Observable<RegisterSupplierResponseDto> {
       
        const response = this._http
            .post<RegisterSupplierResponseDto>(
                `${this.apiBase}/api/products/create-supplier`,
                data,
                {
                    observe: 'response',
                },
            )
            .pipe(
                map(
                    (
                        response: HttpResponse<RegisterSupplierResponseDto>,
                    ) => {
                        const finalResponse: RegisterSupplierResponseDto = {
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
