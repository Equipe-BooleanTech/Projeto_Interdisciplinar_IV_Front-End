import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _tokenService: TokenService) {}
    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const token = this._tokenService.getToken();
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }

}
