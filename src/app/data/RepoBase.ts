import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

export abstract class RepoBase<T> {
    protected subject: BehaviorSubject<T[]> = new BehaviorSubject([]);
    protected current: T[] = [];

    constructor(private http: Http) {}

    protected Get(api: string, ): Observable<T[]> {
        this.http.get(`${environment.apiBase}/${api}`)
            .map(response => response.json())
            .subscribe(result => {
                this.current = result;
                this.subject.next(this.current.slice());
            });

        return this.subject;
    }
}