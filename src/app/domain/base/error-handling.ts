import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ErrorService{
    handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ocorreu um erro desconhecido!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Ocorreu um erro: ${error.error.message}`;
        } else {
            // Erro retornado pelo backend
            errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
        }
        alert(errorMessage);
        return throwError(errorMessage);
    }
}
