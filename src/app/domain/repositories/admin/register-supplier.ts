
import { RegisterSupplierDto, RegisterSupplierResponseDto } from '@domain/dtos';
import { Observable } from 'rxjs';

export interface RegisterSupplierUseCaseRepository {
    registerSupplier(
        data: RegisterSupplierDto,
    ): Observable<RegisterSupplierResponseDto>;
}