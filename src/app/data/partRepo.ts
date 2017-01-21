import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { DataApiFactory, DataApi } from './DataApi';

export interface IPart {
    id: string;
    parentTicketId: string;
    amount: number;
    description: string;
    identifier: string;
    price: number;
    discount: number;
    status: number;
}

export interface IPartRepo {
    Get(): Observable<IPart[]>;
    AddOrUpdate(work: IPart[]): void;
    Delete(work: IPart[]): void;
}

class PartRepo implements IPartRepo {
    constructor(private api: DataApi<IPart>, private ticketId: string) {}

    public Get(): Observable<IPart[]> {
        return this.api.get(`part/${this.ticketId}`);
    }

    public AddOrUpdate(work: IPart[]) {
        this.api.post(`part/${this.ticketId}`, work);
    }

    public Delete(work: IPart[]) {
        work.forEach(workRow => this.api.delete(`part/${this.ticketId}/${workRow.id}`, x => x.id));
    }
}

@Injectable()
export class PartRepoFactory {
    constructor(private apiFactory: DataApiFactory) {}

    public Create(ticketId: string): IPartRepo {
        return new PartRepo(this.apiFactory.create<IPart>(), ticketId);
    }
}