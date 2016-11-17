import { Injectable } from '@angular/core';
import { IRepository } from './IRepository';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export class TicketHeader {
    public lastMofidied: Date;

    constructor(
        public id: string,
        public registerPlate: string,
        public model: string,
        public customer: string,
        lastModified: string) {
            this.lastMofidied = new Date(lastModified);
        }
}

@Injectable()
export class TicketHeaderRepo implements IRepository<TicketHeader> {
    private current: Observable<any>;

    constructor(private http: Http) {
        this.current = this.http.get(`${environment.apiBase}/ticket/`)
            .map(response => {
                return response.json().map(x => new TicketHeader(x.id, x.registerPlate, x.model, x.customer, x.lastModified));
            })
            .flatMap(x => x);
    }

    public Get(): Observable<TicketHeader> {
        return this.current;
    }
}

