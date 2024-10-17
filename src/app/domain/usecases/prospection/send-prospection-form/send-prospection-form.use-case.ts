import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_URL } from 'src/app/shared';
import { map, Observable } from 'rxjs';
import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/dtos';
import { SendProspectionFormUseCaseRepository } from '@domain/repositories';

@Injectable({
    providedIn: 'root',
})
export class SendProspectionFormUseCase
    implements SendProspectionFormUseCaseRepository
{
    public apiBase = API_URL;
    constructor(private _http: HttpClient) {}
    sendForm(
        data: InputSendProspectionFormDto,
    ): Observable<OutputSendProspectionFormDto> {
        const response = this._http
            .post<OutputSendProspectionFormDto>(
                `${this.apiBase}/api/users/prospects`,
                data,
                {
                    observe: 'response',
                },
            )
            .pipe(
                map((response: HttpResponse<OutputSendProspectionFormDto>) => {
                    const finalResponse: OutputSendProspectionFormDto = {
                        statusCode: response.status,
                        message: response?.body?.message,
                    };
                    return finalResponse;
                }),
            );
        return response;
    }
}
