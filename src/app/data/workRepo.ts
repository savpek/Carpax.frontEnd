import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { DataApi, DataApiFactory } from './DataApi';

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
    constructor(private api: DataApi<IWork>, private ticketId: string) {
    }

    public Get(): Observable<IWork[]> {
        return this.api.get(`work/${this.ticketId}`);
    }

    public AddOrUpdate(work: IWork[]) {
        this.api.post(`work/${this.ticketId}`, work);
    }

    public Delete(work: IWork[]) {
        work.forEach(workRow => this.api.delete(`work/${this.ticketId}/${workRow.id}`, x => x.id));
    }
}

@Injectable()
export class WorkRepoFactory {
    constructor(private apiFactory: DataApiFactory) {}

    public Create(ticketId: string): IWorkRepo {
        return new WorkRepo(this.apiFactory.create<IWork>(), ticketId);
    }
}