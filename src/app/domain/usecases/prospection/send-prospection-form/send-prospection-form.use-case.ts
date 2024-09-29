import { Injectable } from '@angular/core';
import { InputSendProspectionFormDto, OutputSendProspectionFormDto } from '.';
import { Observable } from 'rxjs';
import { ProspectionService } from '@infra/services';

@Injectable({
    providedIn: 'root',
})
export class SendProspectionFormUseCase {
    constructor(private _prospectionService: ProspectionService) {}

    execute(
        data: InputSendProspectionFormDto,
    ): Observable<OutputSendProspectionFormDto> {
        return this._prospectionService.sendForm(data);
    }
}
