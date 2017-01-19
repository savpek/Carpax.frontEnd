import { Http, Headers } from '@angular/http';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { LoadingBar } from '../service/loadingBar';
import { Auth } from '../service/auth';

export interface IEntry {
    transient?: string;
}

@Injectable()
export class DataApiFactory {
    constructor(private http: Http, private loadingBar: LoadingBar, private auth: Auth) {}

    public create<T>(): DataApi<T> {
        return new DataApi<T>(this.http, this.loadingBar, this.auth);
    }
}

export class DataApi<T> {
    private subject: BehaviorSubject<T[]> = new BehaviorSubject([]);
    private current: T[] = [];

    constructor(private http: Http, private loadingBar: LoadingBar, private auth: Auth) {}

    private getHeader(): any {
        return new Headers({ 'Authorization': 'Bearer ' + this.auth.getAccessToken() });
    }

    public get(api: string): Observable<T[]> {
        if (this.current.length === 0) {
            this.http.get(`${environment.apiBase}/${api}`, { headers: this.getHeader() })
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
        this.http.post(`${environment.apiBase}/${api}`, data, { headers: this.getHeader() })
            .map(response => response.json())
            .subscribe(result => {
                this.current.push(result);
                this.subject.next(this.current.slice());
            });
    }
}