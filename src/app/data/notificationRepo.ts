import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { Resource, Resources, ResourceFactory } from './resource';
import { timeout, switchMap } from 'rxjs/operators';

export interface INotification {
    ticketId: string;
    type: string;
}

@Injectable()
export class NotificationRepo {
    private resources: Resources<INotification>;
    private current: Observable<INotification[]>;

    constructor(private resourceFactory: ResourceFactory) {
        this.resources = resourceFactory.createMany<INotification>(`notification`);
        this.current = interval(60000)
            .pipe(switchMap(() => this.resources.get()));
    }

    public get(): Observable<INotification[]> {
        return this.current;
    }

    public getForTicket(ticketId: string): Observable<INotification[]> {
        return this.resourceFactory.createMany<INotification>(`notification/${ticketId}`).get();
    }

    public clear(notification: INotification) {
        this.resources.delete(notification, x => `${x.ticketId}/${x.type}`)
    }
}
