import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, Subject, Subscription, timer } from 'rxjs';

import { environment } from '../../environments/environment';

import * as moment from 'moment';
import { LocalStorage } from './localStorage';
import { Router } from '@angular/router';
import { LoadingBar } from './loadingBar';
import { tap, map } from 'rxjs/operators';

export interface ICurrentLogin {
    type?: string;
    name?: string;
    customerName?: string;
    customerId?: string;
    userId?: string;
    token?: string;
    expires?: any;
}

@Injectable()
export class Auth {
    private currentLogin: ILogin = new NotLoggedIn();

    private logoutSubscriber: Subscription;

    private currentUserSubject: BehaviorSubject<ICurrentLogin> =
        new BehaviorSubject<ICurrentLogin>(this.currentLogin.getInfo());

    constructor(private http: Http, private storage: LocalStorage, private route: Router, private loadingBar: LoadingBar) {
        let current = storage.get('login');

        if (current && current.type) {
            this.currentLogin = new Login(this.http, current.type, loadingBar, current);
            this.currentUserSubject.next(this.currentLogin.getInfo());

            this.setLogoutTimer();
        }
    }

    private getLogoutTimeInSeconds() {
        return this.currentLogin.getInfo().expires - moment().unix();
    }

    private setLogoutTimer() {
        if (this.logoutSubscriber) {
            this.logoutSubscriber.unsubscribe();
        }

        if (this.getLogoutTimeInSeconds() <= 0) {
            this.route.navigate(['/customer', 'login']);
        }

        this.logoutSubscriber = timer(this.getLogoutTimeInSeconds() * 1000)
            .subscribe(x => this.route.navigate(['/customer', 'login']));
    }

    public login(userName: string, password: string): Observable<ICurrentLogin> {
        let login = new Login(this.http, 'user', this.loadingBar);


        return login.login('user/token/', { userName: userName, password: password })
            .pipe(map(user => {
                this.currentLogin = login;
                this.storage.set('login', this.currentLogin.getInfo());
                this.currentUserSubject.next(this.currentLogin.getInfo());

                this.setLogoutTimer();

                return user;
            }));
    }

    public loginPartner(id: string, pin: string): Observable<ICurrentLogin>  {
        let login = new Login(this.http, 'partner', this.loadingBar);

        this.loadingBar.operationStarted();

        return login.login('partner/token/', { id: id, pin: pin })
            .pipe(map(user => {
                this.currentLogin = login;
                this.storage.set('login', this.currentLogin.getInfo());
                this.currentUserSubject.next(this.currentLogin.getInfo());

                this.setLogoutTimer();

                return user;
            }));
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

    public passwordResetRequest(email: string): Observable<any> {
        return this.http.post(`${environment.apiBase}/passwordreset/`, {
            email: email
        }).pipe(map(result => result.json()));
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
    constructor(
        private http: Http,
        private type: string,
        private loadingBar: LoadingBar,
        private loginInformation?: ICurrentLogin) {
    }

    public getInfo() {
        if (this.loginInformation) {
            return this.loginInformation;
        }

        return {};
    }

    public login(resource: string, loginObject: any) {
        return this.http.post(`${environment.authBase}/${resource}`, loginObject)
            .pipe(tap(
                null,
                e => this.loadingBar.operationStopped(),
                () => this.loadingBar.operationStopped())
            ).pipe(map(response => {
                let asObject = response.json();

                this.loginInformation = {
                    type: this.type,
                    name: asObject.name,
                    customerName: asObject.customerName,
                    customerId: asObject.customerId,
                    userId: asObject.userId,
                    token: asObject.accessToken,
                    expires: moment().unix() + asObject.expiresIn
                };
                return this.loginInformation;
            }));
    }

    public isValid() {
        return this.loginInformation.token && moment() < moment().add(this.loginInformation.expires, 'seconds');
    }
}
