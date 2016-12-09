import { TicketHeaderRepoFactory, ITicketHeaderRepo, ITicketHeader } from '../data/ticketHeaderRepo';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toArray';

@Injectable()
export class TicketHeaderServiceFactory {
    constructor(private factory: TicketHeaderRepoFactory) {
    }

    public create(): TicketHeaderService {
        return new TicketHeaderService(this.factory.create());
    }

    public createForPartner(partnerId: string): TicketHeaderService {
        return new TicketHeaderService(this.factory.createForPartner(partnerId));
    }
}

export class TicketHeaderService {
    private allTickets: ITicketHeader[] = [];
    private subject: BehaviorSubject<ITicketHeader[]> = new BehaviorSubject<ITicketHeader[]>([]);

    private regex: string;
    private textfilterFunc = (x: ITicketHeader) : boolean => {
        let isMatch = (item) =>
            item && item.match(`.*${this.regex}.*`);

        if (this.regex) {
            return isMatch(x.registerPlate) || isMatch(x.customer) || isMatch(x.model);
        }
        return true;
    };

    constructor(private repo: ITicketHeaderRepo) {
        repo.get()
        .subscribe(x => {
            this.allTickets = x;
        });
    }

    private refresh() {
        this.subject.next(this.allTickets.filter(this.textfilterFunc));
    }

    public getHeaders(): Observable<ITicketHeader[]> {
        return this.subject;
    }

    public textFilter(regex: string) {
        this.regex = regex;
        this.refresh();
    }

    public stateFilter(regex: string) {
    }
}
