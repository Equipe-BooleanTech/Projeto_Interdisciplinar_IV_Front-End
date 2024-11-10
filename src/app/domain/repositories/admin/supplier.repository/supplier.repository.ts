import { PaginatedResponse, SupplierDto } from "@domain/dtos";
import { Observable } from "rxjs";

export interface SupplierRepository {

    getSuppliers(page: number, size: number): Observable<PaginatedResponse<SupplierDto>>;

    getSupplierById(id: string): Observable<SupplierDto>;

    createSupplier(supplier: SupplierDto): Observable<SupplierDto>;

    updateSupplier(supplier: SupplierDto, id: string): Observable<SupplierDto>;

    deleteSupplier(id: string): Observable<{}>;
}