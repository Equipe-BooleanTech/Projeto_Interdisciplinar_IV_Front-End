import { Observable } from 'rxjs';
import {
    InputSendProspectionFormDto,
    OutputSendProspectionFormDto,
} from '@domain/usecases/prospection/send-prospection-form';

export interface ProspectionRepository {
    sendForm(
        data: InputSendProspectionFormDto,
    ): Observable<OutputSendProspectionFormDto>;

    /* activateUser( */
}
