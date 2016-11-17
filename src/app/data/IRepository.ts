import { Observable } from 'rxjs';

export interface IRepository<T> {
    Get<T>(): Observable<T>;
}