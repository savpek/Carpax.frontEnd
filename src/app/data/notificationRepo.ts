import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { DataApiFactory, DataApi } from './DataApi';

export interface INotification {
    ticketId: string;
    notificationType: string;
}

@Injectable()
export class NotificationRepo {
    private api: DataApi<INotification>;

    constructor(apiFactory: DataApiFactory) {
        this.api = apiFactory.create<INotification>();
    }

    public get(): Observable<INotification[]> {
        return this.api.get(`notification/`);
    }

    public clear(notification: INotification) {
    }
}