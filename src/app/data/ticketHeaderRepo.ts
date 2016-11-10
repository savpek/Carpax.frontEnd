import { Injectable } from '@angular/core';
import { IRepository } from './IRepository';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export class TicketHeader {
    public lastMofidied: Date;

    constructor(
        public registerPlate: string,
        public model: string,
        public customer: string,
        lastModified: string) {
            this.lastMofidied = new Date(lastModified);
        }
}

@Injectable()
export class TicketHeaderRepo implements IRepository<TicketHeader> {
    private _current: Observable<any>;

    constructor(private http: Http) {
        this._current = this.http.get(`${environment.apiBase}/ticket/`)
            .map(response => {
                return response.json().map(x => new TicketHeader(x.registerPlate, x.model, x.customer, x.lastModified));
            });
    }

    public Observe<TicketHeader>(): Observable<TicketHeader> {
        return this._current;
    }
}

