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
export class TicketHeaderRepoFactory {
    constructor(private resourceFactory: ResourceFactory) {
    }

    public createForPartner(partnerId: string): ITicketHeaderRepo {
        return new TicketHeaderRepoForPartners(this.resourceFactory, partnerId);
    }

    public create(): ITicketHeaderRepo {
        return new TicketHeaderRepo(this.resourceFactory);
    }
}

class TicketHeaderRepoForPartners implements ITicketHeaderRepo {
    private resource: Resources<ITicketHeader>;

    constructor(resourceFactory: ResourceFactory, private partnerId: string) {
        this.resource = resourceFactory.createMany<ITicketHeader>(`ticketforpartner/${this.partnerId}`);
    }

    public get(): Observable<ITicketHeader[]> {
        return this.resource.get();
    }
}

class TicketHeaderRepo implements ITicketHeaderRepo {
    private resource: Resources<ITicketHeader>;

    constructor(resourceFactory: ResourceFactory, ) {
        this.resource = resourceFactory.createMany<ITicketHeader>('ticket');
    }

    public get(): Observable<ITicketHeader[]> {
        return this.resource.get();
    }
}
