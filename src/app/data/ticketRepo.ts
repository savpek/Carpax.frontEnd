import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface ITicket {
    id: string;
}

@Injectable()
export class TicketRepo {
    constructor(private http: Http) {}

    public Get(id: string): Observable<ITicket> {
        return this.http.get(`${environment.apiBase}/ticket/${id}`)
            .map(response => response.json());
    }

    public Add(ticket: ITicket) {
    }

    public Update(ticket: ITicket) {
        return this.http.post(`${environment.apiBase}/ticket/${ticket.id}`, ticket)
            .map(response => response.json());
    }

    public Delete(ticket: ITicket) {
        return this.http.delete(`${environment.apiBase}/ticket/${ticket.id}`)
            .map(response => response.json());
    }
}