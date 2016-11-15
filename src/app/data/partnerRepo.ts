import { Injectable } from '@angular/core';
import { IRepository } from './IRepository';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface IPartner {
    id: string;
    name: string;
    pin: string;
}


export interface IPartnerMap {
    partnerId: string;
    ticketId: string;
}

@Injectable()
export class PartnerRepo {
    constructor(private http: Http) {}

    public Get(): Observable<IPartner[]> {
        return this.http.get(`${environment.apiBase}/partner/`)
            .map(response => <IPartner[]>response.json());
    }

    public GetCurrentForTicket(ticketId: string): Observable<IPartnerMap[]> {
        return this.http.get(`${environment.apiBase}/partnerforticket/${ticketId}`)
            .map(response => <IPartnerMap[]>response.json());
    }

    public UpdateCurrentForTicket(ticketId: string, partnerId: string) {
        return this.http.post(`${environment.apiBase}/partnerforticket/`, {
            ticketId: ticketId, partnerId: partnerId
        }).map(
            response => <IPartnerMap[]>response.json());
    }
}