
import { RegisterIngredientDto, RegisterIngredientResponseDto, RegisterSupplierDto } from '@domain/dtos';
import { Observable } from 'rxjs';

export interface RegisterIngredientUseCaseRepository {
    registerIngredient(
        data: RegisterIngredientDto,
    ): Observable<RegisterIngredientResponseDto>;

    getSuppliers(): Observable<RegisterSupplierDto>;
}