import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    DefaultResponseDto,
    PaginatedResponse,
    ListByPeriodResponse,
    RevenueDto,
} from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class RevenuesUseCase extends BaseUseCase<RevenueDto> {
    public apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }

    createRevenue(data: RevenueDto): Observable<RevenueDto> {
        return this.create(
            `${this.apiBase}/api/financials/create-revenue`,
            data,
        );
    }

    getRevenues(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<RevenueDto>> {
        return this.getAll(
            `${this.apiBase}/api/financials/get-all-revenues`,
            page,
            size,
        );
    }

    getRevenueById(id: string): Observable<RevenueDto> {
        return this.getById(
            `${this.apiBase}/api/financials/get-revenue-by-id`,
            id,
        );
    }

    listRevenuesPerTime(
        timeRangePath: string,
    ): Observable<ListByPeriodResponse<RevenueDto>> {
        return this.listPerPeriod(
            `${this.apiBase}/api/financials/list-expenses-by-period`,
            { startDate: '', endDate: '' },
            timeRangePath,
        );
    }
}
