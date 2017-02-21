import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Auth } from 'app/service/auth';
import { LoadingBar } from '../service/loadingBar';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class HttpWrapper {
    constructor(private http: Http, private auth: Auth, private loadingBar: LoadingBar) {}

    private getHeader(): any {
        return new Headers({ 'Authorization': 'Bearer ' + this.auth.getAccessToken() });
    }
    
    public get(resource: string): Observable<Response> {
        let observable = this.http.get(resource, { headers: this.getHeader() });

        this.loadingBar.operationStarted();

        return observable
            .do(
                null, 
                e => this.loadingBar.operationStopped(), 
                () => this.loadingBar.operationStopped());
    }

    public post(resource: string, data: any): Observable<Response> {
        let observable = this.http.post(resource, data, { headers: this.getHeader() });
       
        this.loadingBar.operationStarted();

        return observable
            .do(
                null, 
                e => this.loadingBar.operationStopped(), 
                () => this.loadingBar.operationStopped());
    }

    public delete(resource: string): Observable<Response> {
        let observable = this.http.delete(resource, { headers: this.getHeader() });
        
        this.loadingBar.operationStarted();

        return observable
            .do(
                null, 
                e => this.loadingBar.operationStopped(), 
                () => this.loadingBar.operationStopped());
    }
}