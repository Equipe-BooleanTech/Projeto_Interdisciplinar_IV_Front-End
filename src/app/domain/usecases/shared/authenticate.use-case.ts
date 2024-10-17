import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputSendLoginFormDto, OutputSendLoginFormDto } from '@domain/dtos';
import { Observable, map } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class AuthenticateUseCase {
    public apiBase = API_URL;

    constructor(private _http: HttpClient) {}
    sendCredentials(
        data: InputSendLoginFormDto,
    ): Observable<OutputSendLoginFormDto> {
        const response = this._http
            .post<OutputSendLoginFormDto>(
                `${this.apiBase}/api/users/login`,
                data,
                {
                    observe: 'response',
                },
            )
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
