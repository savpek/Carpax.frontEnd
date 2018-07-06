import { Injectable } from '@angular/core';
import { Observable, timer, BehaviorSubject } from 'rxjs';
import { Resources, ResourceFactory } from './resource';
import { switchMap, take } from 'rxjs/operators';

export interface INotification {
    ticketId: string;
    type: string;
}

@Injectable()
export class NotificationRepo {
    private resources: Resources<INotification>;
    private current: BehaviorSubject<INotification[]> = new BehaviorSubject([]);

    constructor(private resourceFactory: ResourceFactory) {
        this.resources = resourceFactory.createMany<INotification>(`notification`);

        timer(0, 30000)
            .pipe(
                switchMap(() => this.resources.get())
            )
            .subscribe(x => this.current.next(x));
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
