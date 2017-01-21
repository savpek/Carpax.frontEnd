import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

import * as moment from 'moment';
import { LocalStorage } from './localStorage';

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
    private expires: any;

    constructor(private http: Http, private storage: LocalStorage) {
        let current = storage.get('user');

        if (current) {
            this.jwt = current.jwt;
            this.expires = moment(current.expires);
            this.currentUserSubject.next(current.user);
        }
    }

    public login(userName: string, password: string): Observable<ICurrentUser> {
        this.http.post(`${environment.authBase}/user/token/`, {
            userName: userName,
            password: password
        }).subscribe(
            response => {
                let asObject = response.json();
                this.jwt = asObject.access_token;
                this.expires = moment().add(asObject.expires_in, 'seconds');

                let user = {
                    userName: asObject.userName,
                    customerName: asObject.customerName,
                };

                this.currentUserSubject.next(user);

                this.storage.set('user', {
                    user: user,
                    expires: this.expires,
                    jwt: this.jwt
                });
            },
            error => {
                this.logOut();
                console.error('Login failed', error);
        });

        return this.currentUserSubject;
    }

    public logOut() {
        this.jwt = '';
        this.expires = moment();
        this.currentUserSubject.next({
            userName: '',
            customerName: ''
        });
    }

    public isCurrentlyLogin() {
        return !!this.getAccessToken();
    }

    public getAccessToken() {
        if (this.jwt && moment() < this.expires) {
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
