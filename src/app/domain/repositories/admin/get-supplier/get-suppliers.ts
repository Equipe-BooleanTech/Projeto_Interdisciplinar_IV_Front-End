import { RegisterSupplierDto } from "@domain/dtos";
import { Observable } from "rxjs";

export interface ListSuppliersUseCaseRepository {
    getSuppliers(): Observable<RegisterSupplierDto>;
}