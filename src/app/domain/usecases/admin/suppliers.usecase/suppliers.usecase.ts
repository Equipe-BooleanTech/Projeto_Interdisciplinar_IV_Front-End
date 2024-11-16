import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    ListByPeriodDto,
    ListByPeriodResponse,
    PaginatedResponse,
    SupplierDto,
} from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SuppliersUseCase extends BaseUseCase<SupplierDto> {
    public apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }

    getSuppliers(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<SupplierDto>> {
        return this.getAll(
            `${this.apiBase}/api/products/get-supplier`,
            page,
            size,
        );
    }
    registerSupplier(data: SupplierDto): Observable<SupplierDto> {
        return this.create(
            `${this.apiBase}/api/products/create-supplier`,
            data,
        );
    }

    listSuppliersPerWeek(
        period?: ListByPeriodDto,
    ): Observable<ListByPeriodResponse<SupplierDto>> {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 7);

        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = currentDate.toISOString().split('T')[0];

        if (period) {
            return this.listPerPeriod(
                `${this.apiBase}/api/products/list-suppliers-by-period`,
                period,
                'groupingType=week',
            ).pipe(
                map((response: ListByPeriodResponse<SupplierDto>) => response),
            );
        }
        return this.listPerPeriod(
            `${this.apiBase}/api/products/list-suppliers-by-period`,
            { startDate: startDateString, endDate: endDateString },
            'groupingType=week',
        ).pipe(map((response: ListByPeriodResponse<SupplierDto>) => response));
    }
}
