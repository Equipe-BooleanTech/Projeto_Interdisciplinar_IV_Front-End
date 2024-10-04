import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/usecases/prospection';
import { ProspectionRepository } from '@infra/repositories';
import { Observable, map } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class ProspectionService implements ProspectionRepository {
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

    /* activateProspection(id: string): {
        
    };
    */
}
