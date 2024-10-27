
import { RegisterIngredientDto, RegisterIngredientResponseDto } from '@domain/dtos';
import { Observable } from 'rxjs';

export interface RegisterIngredientUseCaseRepository {
    registerColaborattor(
        data: RegisterIngredientDto,
    ): Observable<RegisterIngredientResponseDto>;
}