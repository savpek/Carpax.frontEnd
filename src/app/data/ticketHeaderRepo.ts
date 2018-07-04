import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceFactory, Resources } from './resource';

export interface ITicketHeader {
        id: string;
        ready: boolean;
        lastModified: Date;
        partner: string;
        data: any;
}

export interface ITicketHeaderRepo {
    get(): Observable<ITicketHeader[]>;
}

@Injectable()
export class TicketHeaderRepo implements ITicketHeaderRepo {
    private resource: Resources<ITicketHeader>;

    constructor(private resourceFactory: ResourceFactory, ) {
        this.resource = resourceFactory.createMany<ITicketHeader>('ticket');
    }

    public get(): Observable<ITicketHeader[]> {
        return this.resource.get();
    }

    public getForPartner(partnerId: string): Observable<ITicketHeader[]> {
        return this.resourceFactory.createMany<ITicketHeader>(`ticketforpartner/${partnerId}`).get()
    }
}
