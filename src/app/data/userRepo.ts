import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

export interface IUser {
    userName: string;
    transient: string;
}

@Injectable()
export class UserRepo {
    private subject: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
    private current: IUser[] = [];

    constructor(private http: Http) {}

    public Get(): Observable<IUser[]> {
        this.http.get(`${environment.apiBase}/user/`)
            .map(response => response.json())
            .subscribe(x => {
                this.current = x;
                this.subject.next(this.current.slice());
            });

        return this.subject;
    }

    public Add(user: IUser) {
        this.http.post(`${environment.apiBase}/user/`, user)
            .map(response => response.json())
            .subscribe(result => {
                if (result.isSuccess === true) {
                    this.current.push(result.result);
                    this.subject.next(this.current.slice());
                }
            });
    }

    public Delete(user: IUser) {
        this.http.delete(`${environment.apiBase}/user/${user.userName}`)
            .map(response => response.json())
            .subscribe(result => {
                this.current = this.current.filter(c => c !== user);
                this.subject.next(this.current.slice());
            });
    }
}