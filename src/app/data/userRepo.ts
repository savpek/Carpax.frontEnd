import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ResourceFactory, Resources } from './DataApi';

export interface IUser {
    userName: string;
    transient: string;
}

@Injectable()
export class UserRepo {
    private resource: Resources<IUser>;

    constructor(resourceFactory: ResourceFactory) {
        this.resource = resourceFactory.createMany<IUser>('user');
    }
    public Get(): Observable<IUser[]> {
        return this.resource.get();
    }

    public Add(user: IUser): Observable<any> {
        return this.resource.post(user, x => x.userName);
    }

    public Delete(user: IUser): Observable<any> {
        return this.resource.delete(user, x => x.userName);
    }
}