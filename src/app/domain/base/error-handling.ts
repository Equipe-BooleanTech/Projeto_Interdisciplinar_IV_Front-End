import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    constructor(private _toastr: ToastrService) {}
    handleError(error: HttpErrorResponse): Observable<never> {
        const errorMessage = error.error;
        this._toastr.error(errorMessage, 'Ocorreu um erro!');
        return throwError(errorMessage);
    }
}
