import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

export interface IEntry {
    transient?: string;
}

export abstract class RepoBase<T> {
    protected subject: BehaviorSubject<T[]> = new BehaviorSubject([]);
    protected current: T[] = [];

    constructor(private http: Http) {}

    protected get(api: string): Observable<T[]> {
        if (this.current.length === 0) {
            this.http.get(`${environment.apiBase}/${api}`)
                .map(response => response.json())
                .subscribe(result => {
                    this.current = result;
                    this.subject.next(this.current.slice());
                });
        }

        return this.subject;
    }

    protected post(api: string, data: any): void {
        this.http.post(`${environment.apiBase}/${api}`, data)
            .map(response => response.json())
            .subscribe(result => {
                this.current.push(result);
                this.subject.next(this.current.slice());
            });
    }
}