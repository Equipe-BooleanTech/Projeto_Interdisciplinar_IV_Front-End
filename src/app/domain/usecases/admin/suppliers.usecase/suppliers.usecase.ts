import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    SupplierDto,
    SupplierResponseDto,
    PaginatedResponse,
} from '@domain/dtos';
import { SupplierRepository } from '@domain/repositories';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class SuppliersUseCase implements SupplierRepository {
    public apiBase = API_URL;
    constructor(private _http: HttpClient) {}

    getSuppliers(): Observable<PaginatedResponse<SupplierDto>> {
        return this._http.get<PaginatedResponse<SupplierDto>>(
            `${this.apiBase}/api/products/get-supplier`,
        );
    }
    getSupplierById(id: string): Observable<SupplierDto> {
        return this._http.get<SupplierDto>(
            `${this.apiBase}/api/products/get-supplier/${id}`,
        );
    }
    createSupplier(supplier: SupplierDto): Observable<SupplierResponseDto> {
        return this._http.post<SupplierResponseDto>(
            `${this.apiBase}/api/products/create-supplier`,
            supplier,
        );
    }
    updateSupplier(supplier: SupplierDto): Observable<SupplierResponseDto> {
        return this._http.put<SupplierResponseDto>(
            `${this.apiBase}/api/products/update-supplier/${supplier.id}`,
            supplier,
        );
    }
    deleteSupplier(id: string): Observable<SupplierResponseDto> {
        return this._http.delete<SupplierResponseDto>(
            `${this.apiBase}/api/products/delete-supplier/${id}`,
        );
    }
}
