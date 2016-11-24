import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

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
    private current: IWork[] = [];
    private subject: BehaviorSubject<IWork[]> = new BehaviorSubject([]);

    constructor(private http: Http, private ticketId: string) {}

    public Get(): Observable<IWork[]> {
        this.http.get(`${environment.apiBase}/work/${this.ticketId}`)
            .map(response => response.json())
            .subscribe(result => {
                this.current = result;
                this.subject.next(this.current.slice());
            });

        return this.subject;
    }

    public AddOrUpdate(work: IWork[]) {
        this.http.post(`${environment.apiBase}/work/${this.ticketId}`, work)
            .map(response => response.json())
            .subscribe(result => {
                this.current = result;
                this.subject.next(this.current.slice());
            });
    }

    public Delete(work: IWork[]) {
        work.forEach(workRow => this.http.delete(`${environment.apiBase}/work/${this.ticketId}/${workRow.id}`)
            .subscribe(result => {
                this.current = this.current.filter(x => x.id !== workRow.id);
                this.subject.next(this.current.slice());
            }));
    }
}

@Injectable()
export class WorkRepoFactory {
    constructor(private http: Http) {}

    public Create(ticketId: string): IWorkRepo {
        return new WorkRepo(this.http, ticketId);
    }
}