// src/app/shared/services/error.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ocorreu um erro desconhecido!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Backend error
            errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
        }
        alert(errorMessage);
        return throwError(errorMessage);
    }
}