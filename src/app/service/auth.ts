import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

export interface ICurrentUser {
    userName: string;
    customerName: string;
}

@Injectable()
export class Auth {
    private currentUserSubject: BehaviorSubject<ICurrentUser> =
        new BehaviorSubject<ICurrentUser>({
            userName: '',
            customerName: ''
        });

    private jwt: string;
    private expires: number;

    constructor(private http: Http) {}

    public login(userName: string, password: string) {
        this.http.post(`${environment.authBase}/user/token/`, {
            userName: userName,
            password: password
        }).subscribe(
            response => {
                let asObject = response.json();
                this.jwt = asObject.access_token;
                this.expires = asObject.expires;

                this.currentUserSubject.next({
                    userName: asObject.userName,
                    customerName: asObject.customerName,
                });
            },
            error => {
                this.currentUserSubject.next({
                    userName: '',
                    customerName: ''
                });
                console.error('Login failed', error);
        });
    }

    public getAccessToken() {
        if (this.jwt) {
            return this.jwt;
        }
        return '';
    }

    public getCurrentUser(): Observable<ICurrentUser> {
        return this.currentUserSubject;
    }

    public passwordReset() {
    }
}
