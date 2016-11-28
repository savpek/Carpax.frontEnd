import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

export interface IPartner {
    id: string;
    name: string;
    pin: string;
    transient: string;
}


export interface IPartnerMap {
    partnerId: string;
    ticketId: string;
}

@Injectable()
export class PartnerRepo {
    private subject: BehaviorSubject<IPartner[]> = new BehaviorSubject([]);
    private current: IPartner[] = [];

    constructor(private http: Http) {}

    public Get(): Observable<IPartner[]> {
        this.http.get(`${environment.apiBase}/partner/`)
            .map(response => <IPartner[]>response.json())
            .subscribe(x => {
                this.current = x;
                this.subject.next(x.slice());
            });

        return this.subject;
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

    public Add(partner: IPartner) {
        this.http.post(`${environment.apiBase}/partner/`, partner)
            .map(response => <IPartner>response.json())
            .subscribe(x => {
                this.current.push(x);
                this.subject.next(this.current.slice());
            })
    }

    public Delete(partner: IPartner) {
        this.http.delete(`${environment.apiBase}/partner/${partner.id}`)
            .map(response => response.json())
            .subscribe(result => {
                this.current = this.current.filter(c => c !== partner);
                this.subject.next(this.current.slice());
            });
    }
}