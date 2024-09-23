import { Injectable } from '@angular/core';
import { ProspectionRepository } from '@infra/repository';
import { InputSendProspectionFormDto, OutputSendProspectionFormDto } from '.';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SendProspectionFormUseCase {
    constructor(private _prospectionRepository: ProspectionRepository) {}

    execute(
        data: InputSendProspectionFormDto,
    ): Observable<OutputSendProspectionFormDto> {
        return this._prospectionRepository.sendForm(data);
    }
}
