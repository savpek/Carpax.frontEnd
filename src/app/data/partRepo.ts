import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { DataApiFactory, DataApi, ResourceFactory, Resources } from './DataApi';

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
    constructor(private api: Resources<IPart>) {}

    public Get(): Observable<IPart[]> {
        return this.api.get();
    }

    public AddOrUpdate(work: IPart[]) {
        this.api.post(work, x => x.id);
    }

    public Delete(work: IPart[]) {
        work.forEach(workRow => this.api.delete(workRow, x => x.id));
    }
}

@Injectable()
export class PartRepoFactory {
    constructor(private apiFactory: ResourceFactory) {}

    public Create(ticketId: string): IPartRepo {
        return new PartRepo(this.apiFactory.createMany<IPart>(`part/${ticketId}`));
    }
}