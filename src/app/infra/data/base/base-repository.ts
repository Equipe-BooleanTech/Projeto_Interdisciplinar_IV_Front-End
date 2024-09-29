export abstract class BaseRepository<T>{
    abstract findAll(): T[];
    abstract findById(id: string): T;
    abstract save(entity: T): void;
    abstract update(entity: T): void;
    abstract delete(id: string): void;
}