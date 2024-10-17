import { Observable } from 'rxjs';
import { InputSendLoginFormDto, OutputSendLoginFormDto } from '@domain/dtos';

export interface AuthenticateUseCaseRepository {
    sendCredentials(
        data: InputSendLoginFormDto,
    ): Observable<OutputSendLoginFormDto>;
}
