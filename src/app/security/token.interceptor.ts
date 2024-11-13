import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { TokenService } from './token.service';

export const tokenInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const tokenService = new TokenService();
    const token = tokenService.getToken();
    const userId = tokenService.getUserId();

    if (token) {
        let cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        if (userId) {
            cloned = cloned.clone({
                headers: cloned.headers.set('X-User-Id', userId),
            });
        }

        return next(cloned);
    }

    return next(req);
};
