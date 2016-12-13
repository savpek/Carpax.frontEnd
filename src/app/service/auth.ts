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

    constructor(private http: Http) {}

    public getCurrent(): Observable<ICurrentUser> {
        this.http.get(`${environment.apiBase}/currentuser/`)
            .subscribe(response => {
                this.currentUser = <ICurrentUser>response.json();
                this.currentUserSubject.next(this.currentUser);
            });

        return this.currentUserSubject;
    }
}
