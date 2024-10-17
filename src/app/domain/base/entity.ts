import { Roles } from '.';

export abstract class BaseEntity {
    constructor(
        protected id: string,
        protected createdAt: Date,
        protected role: Roles,
    ) {}

    getId(): string {
        return this.id;
    }

    getRole(): string {
        return this.role;
    }
}
