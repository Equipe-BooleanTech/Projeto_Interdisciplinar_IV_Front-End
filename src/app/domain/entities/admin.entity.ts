import { BaseEntity, Roles } from '@domain/base';

export class Admin extends BaseEntity {
    constructor(
        private _fullName: string,
        private _email: string,
        private _phone: string,
        private _company: string,
        private _zip: string,
        private _city: string,
        private _state: string,
        private _country: string,
        private _isActive: boolean = false,
        private _updatedAt?: Date,
    ) {}

    hasRole(role: Roles): boolean {
        return role === Roles.Admin;
    }

    toggleActiveStatus(): void {
        this._isActive = !this._isActive;
        this._updatedAt = new Date();
    }
}
