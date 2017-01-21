import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../../environments/environment';

import * as moment from 'moment';
import { LocalStorage } from './localStorage';

export interface ICurrentLogin {
    type?: string;
    name?: string;
    customerName?: string;
    token?: string;
    expires?: any;
}

@Injectable()
export class Auth {
    private currentLogin: ILogin = new NotLoggedIn();

    private currentUserSubject: BehaviorSubject<ICurrentLogin> =
        new BehaviorSubject<ICurrentLogin>(this.currentLogin.loginInformation);

    constructor(private http: Http, private storage: LocalStorage) {
        let current = storage.get('login');

        if (current) {
            switch (current.type) {
                case 'user':
                    this.currentLogin = new UserLogin(this.http);
                    this.currentLogin.loginInformation = current;
                    break;
                case 'partner':
                    this.currentLogin = new PartnerLogin(this.http);
                    this.currentLogin.loginInformation = current;
            }
        }
    }

    public login(userName: string, password: string): Observable<ICurrentLogin> {
        let currentLogin = new UserLogin(this.http);

        currentLogin.login(userName, password)
            .subscribe(user => {
                this.currentLogin = currentLogin;
                this.storage.set('login', this.currentLogin.loginInformation);
                this.currentUserSubject.next(this.currentLogin.loginInformation);
            });

        return this.currentUserSubject;
    }

    public logOut() {
        this.currentLogin = new NotLoggedIn();
        this.storage.set('login', {});
        this.currentUserSubject.next(this.currentLogin.loginInformation);
    }

    public isLoggedIn() {
        return !!this.getAccessToken();
    }

    public getAccessToken() {
        if (this.currentLogin.loginInformation.token && moment() < this.currentLogin.loginInformation.expires) {
            return this.currentLogin.loginInformation.token;
        }
        return '';
    }

    public getCurrentUser(): Observable<ICurrentLogin> {
        return this.currentUserSubject;
    }

    public passwordReset() {
    }
}

interface ILogin {
    loginInformation: ICurrentLogin;
    isValid(): boolean;
}

class NotLoggedIn implements ILogin {
    public loginInformation: ICurrentLogin = {
        type: 'none',
        name: '',
        customerName: '',
        token: ''
    };
    public isValid() { return false; }
}

class PartnerLogin implements ILogin {
    public type: string = 'partner';
    public token: string;
    public loginInformation: any;
    public expires: any;

    constructor(private http: Http) {
    }

    public login(id: string, pin: string) {
    }
    public isValid() { return false; }

    public dispose() {
        this.token = '';
        this.loginInformation = {};
    }
}

class UserLogin implements ILogin {
    public type: string = 'user';
    public loginInformation: ICurrentLogin;

    constructor(private http: Http) {
    }

    public login(userName: string, password: string): Observable<ICurrentLogin> {
        let subject = new Subject<ICurrentLogin>();

        this.http.post(`${environment.authBase}/user/token/`, {
            userName: userName,
            password: password
        }).subscribe(
            response => {
                let asObject = response.json();

                this.loginInformation = {
                    type: 'user',
                    name: asObject.userName,
                    customerName: asObject.customerName,
                    token: asObject.access_token,
                    expires: moment().add(asObject.expires_in, 'seconds')
                };

                subject.next(this.loginInformation);
            },
            error => {
                console.error('Login failed', error);
                subject.error(error);
        });

        return subject;
    }

    public isValid() {
        return this.loginInformation.token && moment() < this.loginInformation.expires;
    }
}