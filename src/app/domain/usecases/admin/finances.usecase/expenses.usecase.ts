import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    DefaultResponseDto,
    PaginatedResponse,
    ExpenseDto,
    ListByPeriodResponse,
} from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class ExpensesUseCase extends BaseUseCase<ExpenseDto> {
    public apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }

    createExpense(data: ExpenseDto): Observable<ExpenseDto> {
        return this.create(
            `${this.apiBase}/api/financials/create-expense`,
            data,
        );
    }

    getExpenses(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<ExpenseDto>> {
        return this.getAll(
            `${this.apiBase}/api/financials/get-all-expenses`,
            page,
            size,
        );
    }

    getExpenseById(id: string): Observable<ExpenseDto> {
        return this.getById(
            `${this.apiBase}/api/financials/get-expense-by-id`,
            id,
        );
    }

    listExpensesPerTime(
        timeRangePath: string,
    ): Observable<ListByPeriodResponse<ExpenseDto>> {
        return this.listPerPeriod(
            `${this.apiBase}/api/financials/list-expenses-by-period`,
            { startDate: '', endDate: '' },
            timeRangePath,
        );
    }
}
