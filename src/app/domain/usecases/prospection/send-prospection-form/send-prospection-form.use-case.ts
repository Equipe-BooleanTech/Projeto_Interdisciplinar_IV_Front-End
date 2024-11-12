import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_URL } from 'src/app/shared';
import { map, Observable } from 'rxjs';
import { ProspectionDto, DefaultResponseDto } from '@domain/dtos';
import { BaseUseCase } from '@domain/base';

@Injectable({
    providedIn: 'root',
})
export class SendProspectionFormUseCase extends BaseUseCase<ProspectionDto> {
    public apiBase = API_URL;

    sendForm(data: ProspectionDto): Observable<DefaultResponseDto> {
        return this.create(`${this.apiBase}/api/users/prospects`, data);
    }
}
