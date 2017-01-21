import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataApi, DataApiFactory } from './DataApi';

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
    private api: DataApi<IPartner>;
    private mapApi: DataApi<IPartnerMap>;

    constructor(apiFactory: DataApiFactory) {
        this.api = apiFactory.create<IPartner>();
        this.mapApi = apiFactory.create<IPartnerMap>();
    }

    public Get(): Observable<IPartner[]> {
        return this.api.get('partner/');
    }

    public GetCurrentForTicket(ticketId: string): Observable<IPartnerMap[]> {
        return this.mapApi.get(`partnerforticket/${ticketId}`);
    }

    public UpdateCurrentForTicket(ticketId: string, partnerId: string) {
        this.mapApi.post('partnerforticket/', { ticketId: ticketId, partnerId: partnerId });
    }

    public Add(partner: IPartner) {
        this.api.post('partner/', partner);
    }

    public Delete(partner: IPartner) {
        this.api.delete(`partner/${partner.id}`, x => x.id);
    }
}