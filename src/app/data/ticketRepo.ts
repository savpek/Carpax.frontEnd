import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { DataApiFactory, DataApi } from './DataApi';

export interface ITicket {
    id: string;
}

@Injectable()
export class TicketRepo {
    private api: DataApi<ITicket>;

    constructor(apiFactory: DataApiFactory) {
        this.api = apiFactory.create<ITicket>();
    }

    public Get(id: string): Observable<ITicket> {
        return this.api.getSingle(`ticket/${id}`);
    }

    public Add(ticket: ITicket) {
        return this.api.post(`ticket/${ticket.id}`, ticket);
    }

    public Update(ticket: ITicket) {
        return this.api.post(`ticket/${ticket.id}`, ticket);
    }

    public Delete(ticket: ITicket) {
        this.api.delete(`ticket/${ticket.id}`);
    }
}