import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    DefaultResponseDto,
    PaginatedResponse,
    ExpenseDto,
    ListByPeriodResponse,
    FinanceGroupDto,
} from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class FinanceGroupUsecase extends BaseUseCase<FinanceGroupDto> {
    public apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }

    createFinanceGroup(group: FinanceGroupDto): Observable<FinanceGroupDto> {
        return this.create(
            `${this.apiBase}/api/groupfinancials/create-groupfinancial`,
            group,
        );
    }

    getFinanceGroups(): Observable<PaginatedResponse<FinanceGroupDto>> {
        return this.getAll(
            `${this.apiBase}/api/groupfinancials/get-groupfinancial`,
            0,
            999,
        );
    }
}
