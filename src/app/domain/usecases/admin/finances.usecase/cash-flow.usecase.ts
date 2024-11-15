import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    DefaultResponseDto,
    PaginatedResponse,
    ListByPeriodResponse,
    CashFlowDto,
} from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class CashFlowUseCase extends BaseUseCase<CashFlowDto> {
    public apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }

    createCashFlow(
        data: CashFlowDto,
    ): Observable<ListByPeriodResponse<CashFlowDto>> {
        return this.listPerPeriod(
            `${this.apiBase}/api/financials/cash-flow`,
            data,
        );
    }
}
