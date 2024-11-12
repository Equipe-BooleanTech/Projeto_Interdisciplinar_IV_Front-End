import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUseCase, ErrorService } from '@domain/base';
import { PaginatedResponse, SupplierDto } from '@domain/dtos';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

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
}
