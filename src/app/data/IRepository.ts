import { Observable } from 'rxjs';

export interface IRepository<T> {
    Observe<T>(): Observable<T>;
}