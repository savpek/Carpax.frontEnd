import { Http, Headers } from '@angular/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { LoadingBar } from '../service/loadingBar';
import { Auth } from '../service/auth';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export interface IEntry {
    transient?: string;
}

@Injectable()
export class DataApiFactory {
    constructor(private http: Http, private loadingBar: LoadingBar, private auth: Auth, private toast: ToastsManager) {}

    public create<T>(): DataApi<T> {
        return new DataApi<T>(this.http, this.loadingBar, this.auth, this.toast);
    }
}

export class DataApi<T> {
    private subject: BehaviorSubject<T[]> = new BehaviorSubject([]);
    private current: T[] = [];

    constructor(private http: Http,
        private loadingBar: LoadingBar,
        private auth: Auth,
        private toast: ToastsManager) {}

    private getHeader(): any {
        return new Headers({ 'Authorization': 'Bearer ' + this.auth.getAccessToken() });
    }

    public get(resource: string): Observable<T[]> {
        if (this.current.length === 0) {
            this.http.get(`${environment.apiBase}/${resource}`, { headers: this.getHeader() })
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

    public getSingle(resource: string): Observable<T> {
        return this.http.get(`${environment.apiBase}/${resource}`, { headers: this.getHeader() })
            .map(response => response.json());
    }

    public post(resource: string, data: any): Observable<T[]> {
        this.http.post(`${environment.apiBase}/${resource}`, data, { headers: this.getHeader() })
            .do(_ => this.loadingBar.operationStarted())
            .map(response => response.json())
            .subscribe(result => {
                if (result.isSuccess === undefined) {
                    this.current.push(result);
                } else if (result.isSuccess === true) {
                    this.current.push(result.value);
                } else {
                    this.toast.error(result.error);
                    console.error( result.error);
                }

                this.loadingBar.operationStopped();
                this.subject.next(this.current.slice());
            });

        return this.subject;
    }

    public delete(resource: string, idSelector: (x: T) => any): Observable<T[]> {
        this.http.delete(`${environment.apiBase}/${resource}`, { headers: this.getHeader() })
            .do(_ => this.loadingBar.operationStarted())
            .map(response => response.json())
            .subscribe(result => {
                this.loadingBar.operationStopped();

                // Maybe is serialized as array, this isn't good implementation, requires custom
                // serialization.
                if (result.length && result[0]) {
                    this.current = this.current.filter(c => idSelector(c) !== idSelector(result[0]));
                } else {
                    this.current = this.current.filter(c => idSelector(c) !== idSelector(result));
                }
                this.subject.next(this.current.slice());
            });

        return this.subject;
    }
}