export abstract class BaseEntity {
    constructor(
        protected id: string,
        protected createdAt: Date,
    ) {}

    getId(): string {
        return this.id;
    }
}
