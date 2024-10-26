import {
    RegisterColaborattorDto,
    RegisterColaborattorResponseDto,
} from '@domain/dtos';
import { Observable } from 'rxjs';

export interface RegisterColaborattorUseCaseRepository {
    registerColaborattor(
        data: RegisterColaborattorDto,
    ): Observable<RegisterColaborattorResponseDto>;
}
