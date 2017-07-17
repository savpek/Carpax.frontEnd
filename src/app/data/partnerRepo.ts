import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resources, ResourceFactory } from './resource';

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
    constructor(private resourceFactory: ResourceFactory) {
    }

    public Get(): Observable<IPartner[]> {
        return this.resourceFactory.createMany<IPartner>('partner/').get();
    }

    public GetById(id: string): Observable<IPartner> {
        return this.resourceFactory.create<IPartner>(`partner/${id}`).get();
    }

    public GetCurrentForTicket(ticketId: string): Observable<IPartnerMap[]> {
        return this.resourceFactory.create<IPartnerMap[]>(`partnerforticket/${ticketId}`).get();
    }

    public UpdateCurrentForTicket(ticketId: string, partnerId: string): Observable<IPartnerMap[]> {
        return this.resourceFactory.create<IPartnerMap[]>(`partnerforticket/`)
            .post({ ticketId: ticketId, partnerId: partnerId });
    }

    public Add(partner: IPartner): Observable<IPartner> {
        return this.resourceFactory.create<IPartner>('partner/').post(partner);
    }

    public Delete(partner: IPartner): Observable<IPartner[]> {
        return this.resourceFactory.createMany<IPartner>('partner/').delete(partner, x => x.id);
    }
}
