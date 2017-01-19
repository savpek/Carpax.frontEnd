import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject} from 'rxjs';

import { environment } from '../../environments/environment';

export interface ICurrentUser {
    userName: string;
    customerName: string;
}

@Injectable()
export class Auth {
    private currentUserSubject: Subject<ICurrentUser> = new Subject<ICurrentUser>();
    private currentUser: ICurrentUser;
    private jwt: any;

    constructor(private http: Http) {}

    public login(userName: string, password: string) {
        this.http.post(`${environment.authBase}/user/token/`, {
            userName: userName,
            password: password
        }).subscribe(
            x => this.jwt = x.json(),
            error => {
                console.error('Login failed', error);
        });
    }

    public accessToken() {
        if (this.jwt) {
            return this.jwt;
        }
        return {};
    }

    public passwordReset() {
    }

    public getCurrent(): Observable<ICurrentUser> {
        this.http.get(`${environment.apiBase}/currentuser/`)
            .subscribe(response => {
                this.currentUser = <ICurrentUser>response.json();
                this.currentUserSubject.next(this.currentUser);
            });

        return this.currentUserSubject;
    }
}
