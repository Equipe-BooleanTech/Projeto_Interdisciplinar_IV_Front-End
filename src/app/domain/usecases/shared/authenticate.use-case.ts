import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputSendLoginFormDto, OutputSendLoginFormDto } from '@domain/dtos';
import { Observable, catchError, map, of } from 'rxjs';
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
        return this._http
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
                        token: response.body?.token,
                    };
                    return finalResponse;
                }),
                catchError((error) => {
                    return of({
                        statusCode: error.error.statusCode,
                        message: error.error.message,
                    });
                }),
            );
    }

    isLoggedIn(): boolean {
        return document.cookie.includes('token');
    }

    logout(): void {
        document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log(document.cookie);
    }
}
