import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Resource, ResourceFactory } from './resource';

export interface ITicket {
    id: string;
}

@Injectable()
export class TicketRepo {
    constructor(private apiFactory: ResourceFactory) {
    }

    public Get(id: string): Observable<ITicket> {
        return this.apiFactory.create<ITicket>(`ticket/${id}`).get();
    }

    public Add(ticket: ITicket): Observable<ITicket> {
        return this.apiFactory.create<ITicket>(`ticket/${ticket.id}`).post(ticket);
    }

    public Update(ticket: ITicket): Observable<ITicket> {
        return this.apiFactory.create<ITicket>(`ticket/${ticket.id}`).post(ticket);
    }

    public Delete(ticket: ITicket): Observable<void> {
        return this.apiFactory.create<ITicket>(`ticket/${ticket.id}`).delete();
    }
}
