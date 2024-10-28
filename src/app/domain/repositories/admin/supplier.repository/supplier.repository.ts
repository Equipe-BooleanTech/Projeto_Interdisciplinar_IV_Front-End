import { SupplierDto, SupplierResponseDto } from "@domain/dtos";
import { Observable } from "rxjs";

export interface SupplierRepository {
    getSuppliers(): Observable<SupplierDto[]>;
    getSupplierById(id: string): Observable<SupplierDto>;
    createSupplier(supplier: SupplierDto): Observable<SupplierResponseDto>;
    updateSupplier(supplier: SupplierDto): Observable<SupplierResponseDto>;
    deleteSupplier(id: string): Observable<SupplierResponseDto>;
}