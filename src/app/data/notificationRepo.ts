import { RepoBase } from './RepoBase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

export interface INotification {
    ticketId: string;
    notificationType: string;
}

@Injectable()
export class NotificationRepo extends RepoBase<INotification> {
    constructor(http: Http) {
        super(http);
    }

    public get(): Observable<INotification[]> {
        return super.get(`notification/`);
    }

    public clear(notification: INotification) {
    }
}