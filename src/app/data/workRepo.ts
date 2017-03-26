import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Resources, ResourceFactory } from './DataApi';

export interface IWork {
    id: string;
    description: string;
    price: number;
    units: number;
}

export interface IWorkRepo {
    Get(): Observable<IWork[]>;
    AddOrUpdate(work: IWork[]): void;
    Delete(work: IWork[]): void;
}

class WorkRepo implements IWorkRepo {
    constructor(private api: Resources<IWork>) {
    }

    public Get(): Observable<IWork[]> {
        return this.api.get();
    }

    public AddOrUpdate(work: IWork[]) {
        this.api.post(work, w => w.id);
    }

    public Delete(work: IWork[]) {
        work.forEach(workRow => this.api.delete(workRow, x => x.id));
    }
}

@Injectable()
export class WorkRepoFactory {
    constructor(private apiFactory: ResourceFactory) {}

    public Create(ticketId: string): IWorkRepo {
        return new WorkRepo(this.apiFactory.createMany<IWork>(`work/${ticketId}`));
    }
}