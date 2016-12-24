import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataApiFactory, DataApi } from './DataApi';

export interface ITicketHeader {
        id: string;
        ready: boolean;
        registerPlate: string;
        model: string;
        customer: string;
        lastModified: Date;
        workStartDate: Date;
        workEndDate: Date;
}

export interface ITicketHeaderRepo {
    get(): Observable<ITicketHeader[]>;
}

@Injectable()
export class TicketHeaderRepoFactory {
    constructor(private apiFactory: DataApiFactory) {
    }

    public createForPartner(partnerId: string): ITicketHeaderRepo {
        return new TicketHeaderRepoForPartners(this.apiFactory, partnerId);
    }

    public create(): ITicketHeaderRepo {
        return new TicketHeaderRepo(this.apiFactory);
    }
}

class TicketHeaderRepoForPartners implements ITicketHeaderRepo {
    private api: DataApi<ITicketHeader>;

    constructor(apiFactory: DataApiFactory, private partnerId: string) {
        this.api = apiFactory.create<ITicketHeader>();
    }

    public get(): Observable<ITicketHeader[]> {
        return this.api.get(`ticketforpartner/${this.partnerId}`);
    }
}

class TicketHeaderRepo implements ITicketHeaderRepo {
    private api: DataApi<ITicketHeader>;

    constructor(apiFactory: DataApiFactory, ) {
        this.api = apiFactory.create<ITicketHeader>();
    }

    public get(): Observable<ITicketHeader[]> {
        return this.api.get(`ticket/`);
    }
}
