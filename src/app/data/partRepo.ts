import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

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
    private current: IPart[] = [];
    private subject: BehaviorSubject<IPart[]> = new BehaviorSubject([]);

    constructor(private http: Http, private ticketId: string) {}

    public Get(): Observable<IPart[]> {
        this.http.get(`${environment.apiBase}/part/${this.ticketId}`)
            .map(response => response.json())
            .subscribe(result => {
                this.current = result;
                this.subject.next(this.current.slice());
            });

        return this.subject;
    }

    public AddOrUpdate(work: IPart[]) {
        this.http.post(`${environment.apiBase}/part/${this.ticketId}`, work)
            .map(response => response.json())
            .subscribe(result => {
                this.current = result;
                this.subject.next(this.current.slice());
            });
    }

    public Delete(work: IPart[]) {
        work.forEach(workRow => this.http.delete(`${environment.apiBase}/part/${this.ticketId}/${workRow.id}`)
            .subscribe(result => {
                this.current = this.current.filter(x => x.id !== workRow.id);
                this.subject.next(this.current.slice());
            }));
    }
}

@Injectable()
export class PartRepoFactory {
    constructor(private http: Http) {}

    public Create(ticketId: string): IPartRepo {
        return new PartRepo(this.http, ticketId);
    }
}