import { Observable } from 'rxjs';
import {
    InputSendLoginFormDto,
    OutputSendLoginFormDto,
} from '@domain/dtos';

export interface AuthRepository {
    sendCredentials(
        data: InputSendLoginFormDto,
    ): Observable<OutputSendLoginFormDto>;
}
