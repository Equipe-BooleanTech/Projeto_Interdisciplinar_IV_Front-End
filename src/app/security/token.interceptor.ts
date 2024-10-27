
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { TokenService } from './token.service';

export const tokenInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const tokenService = new TokenService();
    const token = tokenService.getToken();
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(cloned);
    }
    return next(req);
};
