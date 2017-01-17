import { Http } from '@angular/http';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { LoadingBar } from '../service/loadingBar';

export interface IEntry {
    transient?: string;
}

@Injectable()
export class DataApiFactory {
    constructor(private http: Http, private loadingBar: LoadingBar) {}

    public create<T>(): DataApi<T> {
        return new DataApi<T>(this.http, this.loadingBar);
    }
}

export class DataApi<T> {
    private subject: BehaviorSubject<T[]> = new BehaviorSubject([]);
    private current: T[] = [];

    constructor(private http: Http, private loadingBar: LoadingBar) {}

    public get(api: string): Observable<T[]> {
        if (this.current.length === 0) {
            this.http.get(`${environment.apiBase}/${api}`)
                .do(_ => this.loadingBar.operationStarted())
                .map(response => response.json())
                .subscribe(result => {
                    this.current = result;
                    this.subject.next(this.current.slice());
                    this.loadingBar.operationStopped()
                });
        }

        return this.subject;
    }

    public post(api: string, data: any): void {
        this.http.post(`${environment.apiBase}/${api}`, data)
            .map(response => response.json())
            .subscribe(result => {
                this.current.push(result);
                this.subject.next(this.current.slice());
            });
    }
}