import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { RepoBase } from './RepoBase';

export interface ITicketHeader {
        id: string;
        registerPlate: string;
        model: string;
        customer: string;
        lastModified: Date;
}

export interface ITicketHeaderRepo {
    get(): Observable<ITicketHeader[]>;
}

@Injectable()
export class TicketHeaderRepoFactory {
    constructor(private http: Http) {
    }

    public createForPartner(partnerId: string): ITicketHeaderRepo {
        return new TicketHeaderRepoForPartners(this.http, partnerId);
    }

    public create(): ITicketHeaderRepo {
        return new TicketHeaderRepo(this.http);
    }
}

class TicketHeaderRepoForPartners extends RepoBase<ITicketHeader> implements ITicketHeaderRepo {
    constructor(http: Http, private partnerId: string) {
        super(http);
    }

    public get(): Observable<ITicketHeader[]> {
        return super.get(`ticketforpartner/${this.partnerId}`);
    }
}

class TicketHeaderRepo extends RepoBase<ITicketHeader> implements ITicketHeaderRepo {
    constructor(http: Http) {
        super(http);
    }

    public get(): Observable<ITicketHeader[]> {
        return super.get(`ticket/`);
    }
}
