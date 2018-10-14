import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResourceFactory } from './resource';

export interface ITicket {
    id?: string;
    ready?: boolean;
    lastModified?: Date;
    created?: Date;
    data: any;
}

@Injectable()
export class TicketRepo {
    constructor(private apiFactory: ResourceFactory) {
    }

    public Get(id: string): Observable<ITicket> {
        return this.apiFactory.create<ITicket>(`ticket/${id}`).get();
    }

    public Add(ticket: ITicket): Observable<ITicket> {
        return this.apiFactory.create<ITicket>(`ticket/`).post(ticket);
    }

    public Update(ticket: ITicket): Observable<ITicket> {
        return this.apiFactory.create<ITicket>(`ticket/`).post(ticket);
    }

    public Delete(ticket: ITicket): Observable<void> {
        return this.apiFactory.create<ITicket>(`ticket/${ticket.id}`).delete();
    }
}
