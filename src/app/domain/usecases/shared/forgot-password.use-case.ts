import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordUseCase {
  public apiBase = API_URL;
  constructor(private http: HttpClient) {}

  resetPassword(data: { newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiBase}/api/users/update-password`, data);
  }
}
