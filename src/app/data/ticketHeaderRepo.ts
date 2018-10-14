import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceFactory, Resource } from './resource';

export interface ITicketHeader {
        id: string;
        ready: boolean;
        lastModified: Date;
        partner: string;
        data: any;
}

export interface ITicketHeaders {
    listSchema: any;
    tickets: ITicketHeader[];
}

export interface ITicketHeaderRepo {
    get(): Observable<ITicketHeaders>;
}

@Injectable()
export class TicketHeaderRepo implements ITicketHeaderRepo {
    private resource: Resource<ITicketHeaders>;

    constructor(private resourceFactory: ResourceFactory, ) {
        this.resource = resourceFactory.create<ITicketHeaders>('ticket');
    }

    public get(): Observable<ITicketHeaders> {
        return this.resource.get();
    }

    public getForPartner(partnerId: string): Observable<ITicketHeaders> {
        return this.resourceFactory.create<ITicketHeaders>(`ticketforpartner/${partnerId}`).get()
    }
}
