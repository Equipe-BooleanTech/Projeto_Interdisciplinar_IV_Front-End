import { BaseEntity, Roles } from '@domain/base';

export class Prospection extends BaseEntity {
    constructor(
        private _fullName: string,
        private _email: string,
        private _phone: string,
        private _company?: string,
        private _updatedAt?: Date,
        private _isActive: boolean = false,
    ) {}

    hasRole(role: Roles): boolean {
        return role === Roles.User;
    }

    toggleActiveStatus(): void {
        this._isActive = !this._isActive;
        this._updatedAt = new Date();
    }
}
