import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ResourceFactory, Resources } from './resource';

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
    constructor(private resource: Resources<IPart>) {}

    public Get(): Observable<IPart[]> {
        return this.resource.get();
    }

    public AddOrUpdate(work: IPart[]) {
        this.resource.post(work, x => x.id);
    }

    public Delete(work: IPart[]) {
        work.forEach(workRow => this.resource.delete(workRow, x => x.id));
    }
}

@Injectable()
export class PartRepoFactory {
    constructor(private apiFactory: ResourceFactory) {}

    public Create(ticketId: string): IPartRepo {
        return new PartRepo(this.apiFactory.createMany<IPart>(`part/${ticketId}`));
    }
}
