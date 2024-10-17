import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/dtos';
import { Observable } from 'rxjs';

export interface SendProspectionFormUseCaseRepository {
    sendForm(
        data: InputSendProspectionFormDto,
    ): Observable<OutputSendProspectionFormDto>;

}
