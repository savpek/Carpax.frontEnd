import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { DataApi, DataApiFactory } from './DataApi';

export interface IUser {
    userName: string;
    transient: string;
}

@Injectable()
export class UserRepo {
    private api: DataApi<IUser>;

    constructor(apiFactory: DataApiFactory) {
        this.api = apiFactory.create<IUser>();
    }
    public Get(): Observable<IUser[]> {
        return this.api.get('user/');
    }

    public Add(user: IUser) {
        this.api.post('user', user);
    }

    public Delete(user: IUser) {
        this.api.delete(`user/${user.userName}`, x => x.userName);
    }
}