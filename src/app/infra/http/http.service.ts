import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';
import { BaseHttpService } from '../base/base-http-service';

@Injectable({
    providedIn: 'root',
})
export class HttpService extends BaseHttpService {
    private _baseUrl = API_URL;

    constructor(private _http: HttpClient) {
        super();
    }

    get<T>(endpoint: string): Observable<T> {
        return this._http.get<T>(`${this._baseUrl}/${endpoint}`);
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this._http.post<T>(`${this._baseUrl}/${endpoint}`, data);
    }

    override put<T>(url: string, body: any): Observable<T> {
        return this._http.put<T>(`${this._baseUrl}/${url}`, body);
    }
    override delete<T>(url: string): Observable<T> {
        return this._http.delete<T>(`${this._baseUrl}/${url}`);
    }
}
