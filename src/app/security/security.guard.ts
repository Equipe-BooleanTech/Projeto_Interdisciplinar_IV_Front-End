import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '.';

@Injectable({
    providedIn: 'root',
})
export class SecurityGuard implements CanActivate {
    constructor(
        private _tokenService: TokenService,
        private _router: Router,
    ) {}

    canActivate(): boolean {
        if (this._tokenService.isTokenValid()) {
            return true;
        } else {
            this._router.navigate(['/admin/nao-autorizado']);
            return false;
        }
    }
}
