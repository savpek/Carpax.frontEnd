import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Resource, Resources, ResourceFactory } from './resource';

export interface INotification {
    ticketId: string;
    type: string;
}

@Injectable()
export class NotificationRepo {
    private resources: Resources<INotification>;

    constructor(private resourceFactory: ResourceFactory) {
        this.resources = resourceFactory.createMany<INotification>(`notification`);
    }

    public get(): Observable<INotification[]> {
        return this.resources.get();
    }

    public getForTicket(ticketId: string): Observable<INotification[]> {
        return this.resourceFactory.createMany<INotification>(`notification/${ticketId}`).get();
    }

    public clear(notification: INotification) {
        this.resources.delete(notification, x => `${x.ticketId}/${x.type}`)
    }
}