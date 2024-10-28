import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterSupplierDto } from "@domain/dtos";
import { ListSuppliersUseCaseRepository } from "@domain/repositories/admin/get-supplier/get-suppliers";
import { Observable } from "rxjs";
import { API_URL } from "src/app/shared";

@Injectable({
    providedIn: 'root',
})
export class ListSuppliersUseCase
    implements ListSuppliersUseCaseRepository{

        public apiBase = API_URL;
        constructor(private _http: HttpClient) {}

    getSuppliers(): Observable<RegisterSupplierDto> {
        return this._http.get<RegisterSupplierDto>(`${this.apiBase}/api/products/get-suppliers`);
    }
    
    }
