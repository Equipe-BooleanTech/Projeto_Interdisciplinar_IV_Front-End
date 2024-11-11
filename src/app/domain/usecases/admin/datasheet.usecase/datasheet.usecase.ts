import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import { DataSheetDto, PaginatedResponse } from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

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
}
