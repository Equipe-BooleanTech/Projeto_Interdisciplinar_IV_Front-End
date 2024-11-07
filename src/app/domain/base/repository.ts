import { PaginatedResponse } from "@domain/dtos";
import { Observable } from "rxjs";

export interface BaseUseCaseRepository<T> {
    getAll(url: string, page: number, size: number): Observable<PaginatedResponse<T>>;
    getById(url: string, id: string): Observable<T>;
    create(url: string, data: T): Observable<T>;
    update(url: string, data: T, id: string): Observable<T>;
    delete(url: string, id: string): Observable<T>;
}
