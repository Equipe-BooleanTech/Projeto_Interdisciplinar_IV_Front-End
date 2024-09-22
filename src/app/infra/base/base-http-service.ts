export abstract class BaseHttpService {
    abstract get<T>(url: string): Promise<T>;
    abstract post<T>(url: string, body: any): Promise<T>;
    abstract put<T>(url: string, body: any): Promise<T>;
    abstract delete<T>(url: string): Promise<T>;
}