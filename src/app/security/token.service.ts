import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor() {}

    public setToken(token: string): void {
        document.cookie = `token=${token}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}; path=/;`;
    }

    public getToken(): string | null {
        const match = document.cookie.match(/(?:^|;\s*)token\s*=\s*([^;]*)/);
        return match ? match[1] : null;
    }

    public removeToken(): void {
        document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    public hasToken(): boolean {
        return !!this.getToken();
    }

    public isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) {
            return true;
        }
        return false;
    }

    public isTokenValid(): boolean {
        return this.hasToken() && !this.isTokenExpired();
    }
}
