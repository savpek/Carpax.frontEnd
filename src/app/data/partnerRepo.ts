import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resources, ResourceFactory } from './resource';

export interface IPartner {
    id?: string;
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
    private resource: Resources<IPartner>;

    constructor(private resourceFactory: ResourceFactory) {
        this.resource = this.resourceFactory.createMany<IPartner>('partner/');
    }

    public Get(): Observable<IPartner[]> {
        return this.resource.get();
    }

    public GetById(id: string): Observable<IPartner> {
        return this.resourceFactory.create<IPartner>(`partner/${id}`).get();
    }

    public GetCurrentForTicket(ticketId: string): Observable<IPartnerMap[]> {
        return this.resourceFactory.createMany<IPartnerMap>(`partnerforticket/${ticketId}`).get();
    }

    public UpdateCurrentForTicket(ticketId: string, partnerId: string): Observable<IPartnerMap[]> {
        return this.resourceFactory.createMany<IPartnerMap>(`partnerforticket/`)
            .post({ ticketId: ticketId, partnerId: partnerId }, x => x.partnerId + x.ticketId);
    }

    public Add(partner: IPartner): Observable<IPartner[]> {
        return this.resource.post(partner, x => x.id);
    }

    public Delete(partner: IPartner): Observable<IPartner[]> {
        return this.resource.delete(partner, x => x.id);
    }
}
