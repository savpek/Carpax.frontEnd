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
        new BehaviorSubject<ICurrentLogin>(this.currentLogin.getInfo());

    constructor(private http: Http, private storage: LocalStorage) {
        let current = storage.get('login');

        if (current && current.type) {
            this.currentLogin = new Login(this.http, current.type, current);
            this.currentUserSubject.next(this.currentLogin.getInfo());
        }
    }

    public login(userName: string, password: string): Observable<ICurrentLogin> {
        let login = new Login(this.http, 'user');

        return login.login('user/token/', { userName: userName, password: password })
            .map(user => {
                this.currentLogin = login;
                this.storage.set('login', this.currentLogin.getInfo());
                this.currentUserSubject.next(this.currentLogin.getInfo());
                return user;
            });
    }

    public loginPartner(id: string, pin: string): Observable<ICurrentLogin>  {
        let login = new Login(this.http, 'partner');

        return login.login('partner/token/', { id: id, pin: pin })
            .map(user => {
                this.currentLogin = login;
                this.storage.set('login', this.currentLogin.getInfo());
                this.currentUserSubject.next(this.currentLogin.getInfo());
                return user;
            });
    }

    public logOut() {
        this.currentLogin = new NotLoggedIn();
        this.storage.set('login', {});
        this.currentUserSubject.next(this.currentLogin.getInfo());
    }

    public isLoggedIn(type: string) {
        return this.currentLogin.isValid() && this.currentLogin.getInfo().type === type;
    }

    public getAccessToken() {
        return this.currentLogin.getInfo().token;
    }

    public getCurrentUser(): Observable<ICurrentLogin> {
        return this.currentUserSubject;
    }

    public passwordReset(email: string): Observable<any> {
        return this.http.post(`${environment.apiBase}/passwordreset/`, {
            email: email
        }).map(result => result.json());
    }
}

interface ILogin {
    getInfo(): ICurrentLogin;
    isValid(): boolean;
}

class NotLoggedIn implements ILogin {
    public getInfo() {
        return {
            type: 'none',
            name: '',
            customerName: '',
            token: ''
        };
    };
    public isValid() { return false; }
}

class Login implements ILogin {
    constructor(private http: Http, private type: string, private loginInformation?: ICurrentLogin) {
    }

    public getInfo() {
        if (this.loginInformation) {
            return this.loginInformation;
        }

        return {};
    }

    public login(resource: string, loginObject: any) {
        return this.http.post(`${environment.authBase}/${resource}`, loginObject).map(
            response => {
                let asObject = response.json();

                this.loginInformation = {
                    type: this.type,
                    name: asObject.name,
                    customerName: asObject.customerName,
                    token: asObject.access_token,
                    expires: asObject.expires_in
                };
                return this.loginInformation;
        });
    }

    public isValid() {
        return this.loginInformation.token && moment() < moment().add(this.loginInformation.expires, 'seconds');
    }
}