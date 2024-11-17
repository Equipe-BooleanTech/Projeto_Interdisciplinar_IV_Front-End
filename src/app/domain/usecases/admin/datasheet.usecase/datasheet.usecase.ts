import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import {
    DataSheetDto,
    ListByPeriodDto,
    ListByPeriodResponse,
    PaginatedResponse,
} from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DataSheetUseCase extends BaseUseCase<DataSheetDto> {
    private apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }
    getDatasheets(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<DataSheetDto>> {
        return this.getAll(
            `${this.apiBase}/api/datasheets/get-datasheets`,
            page,
            size,
        );
    }

    registerDataSheet(data: DataSheetDto): Observable<DataSheetDto> {
        return this.create(
            `${this.apiBase}/api/datasheets/create-datasheet`,
            data,
        );
    }

    listDataSheetPerWeek(
        period?: ListByPeriodDto,
    ): Observable<ListByPeriodResponse<DataSheetDto>> {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 7);

        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = currentDate.toISOString().split('T')[0];

        if (period) {
            return this.listPerPeriod(
                `${this.apiBase}/api/datasheets/list-datasheets-by-period`,
                period,
                'groupingType=week',
            ).pipe(
                map((response: ListByPeriodResponse<DataSheetDto>) => response),
            );
        } else {
            return this.listPerPeriod(
                `${this.apiBase}/api/datasheets/list-datasheets-by-period`,
                { startDate: startDateString, endDate: endDateString },
                'groupingType=week',
            ).pipe(
                map((response: ListByPeriodResponse<DataSheetDto>) => response),
            );
        }
    }

    getDataSheetById(id: string): Observable<DataSheetDto> {
        return this.getById(
            `${this.apiBase}/api/datasheets/get-datasheet-by-id`,
            id,
        );
    }

    updateDataSheet(id: string, data: DataSheetDto): Observable<DataSheetDto> {
        return this.update(
            `${this.apiBase}/api/datasheets/update-datasheet`,
            data,
            id,
        );
    }

    deleteDataSheet(id: string): Observable<DataSheetDto> {
        return this.delete(
            `${this.apiBase}/api/datasheets/delete-datasheet`,
            id,
        );
    }
}
