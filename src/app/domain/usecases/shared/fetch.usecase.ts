import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class FetchUseCase<T> {
    public apiBase = API_URL;

    constructor(private _http: HttpClient) { }

    get(url: string): Observable<T> {
        return this._http.get<T>(`${this.apiBase}/${url}`).pipe();
    }

    post(url: string, body: any): Observable<T> {
        return this._http.post<T>(`${this.apiBase}/${url}`, body).pipe();
    }

    put(url: string, body: any): Observable<T> {
        return this._http.put<T>(`${this.apiBase}/${url}`, body).pipe();
    }

    delete(url: string): Observable<HttpResponse<any>> {
        return this._http.delete(`${this.apiBase}/${url}`, { observe: 'response' }).pipe();
    }

}