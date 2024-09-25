import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputSendLoginFormDto } from '@domain/usecases/shared/authenticate/InputSendLoginFormDto/InputSendLoginFormDto';
import { OutputSendLoginFormDto } from '@domain/usecases/shared/authenticate/OutputSendLoginFormDto/OutputSendLoginFormDto';
import { AuthRepository } from '@infra/repositories';
import { map, Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements AuthRepository {
    public apiBase = API_URL;

    constructor(private _http: HttpClient) {}
    sendCredentials(
        data: InputSendLoginFormDto,
    ): Observable<OutputSendLoginFormDto> {
        const response = this._http
            .post<OutputSendLoginFormDto>(`${this.apiBase}/api/users/login`, data, {
                observe: 'response',
            })
            .pipe(
                map((response: HttpResponse<OutputSendLoginFormDto>) => {
                    const finalResponse: OutputSendLoginFormDto = {
                        statusCode: response.status,
                        message: response?.body?.message ?? 'Mensagem padrão', 
                    };
                    return finalResponse;
                }),
            );
        return response;
    }
}
