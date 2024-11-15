import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import { DataSheetGroupDto, PaginatedResponse } from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class DataSheetGroupUseCase extends BaseUseCase<DataSheetGroupDto> {
    private apiBase = API_URL;

    constructor(_http: HttpClient, _errorService: ErrorService) {
        super(_http, _errorService);
    }
    getDatasheetsGroup(
        page: number,
        size: number,
    ): Observable<PaginatedResponse<DataSheetGroupDto>> {
        return this.getAll(
            `${this.apiBase}/api/groupsheets/get-groupsheets`,
            page,
            size,
        );
    }

    getGroupById(id: string): Observable<DataSheetGroupDto> {
        return this.getById(
            `${this.apiBase}/api/groupsheets/get-groupsheet-by-id`,
            id,
        );
    }

    registerDataSheetGroup(
        data: DataSheetGroupDto,
    ): Observable<DataSheetGroupDto> {
        return this.create(
            `${this.apiBase}/api/groupsheets/create-groupsheet`,
            data,
        );
    }
}
