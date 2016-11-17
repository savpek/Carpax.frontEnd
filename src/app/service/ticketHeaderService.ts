import { TicketHeader, TicketHeaderRepo } from '../data/ticketHeaderRepo';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toArray';

@Injectable()
export class TicketHeaderService {
    private allTickets: TicketHeader[] = [];
    private subject: BehaviorSubject<TicketHeader[]> = new BehaviorSubject<TicketHeader[]>([]);

    private regex: string;
    private textfilterFunc = (x: TicketHeader) : boolean => {
        let isMatch = (item) => 
            item && item.match(`.*${this.regex}.*`);

        if (this.regex) {
            return isMatch(x.registerPlate) || isMatch(x.customer) || isMatch(x.model);
        }
        return true;
    };

    constructor(private repo: TicketHeaderRepo) {
        repo.Get()
        .toArray()
        .subscribe(x => {
            this.allTickets = x;
            this.RefreshData();
        });
    }

    private RefreshData() {
        this.subject.next(this.allTickets.filter(this.textfilterFunc));
    }

    public GetHeaders(): Observable<TicketHeader[]> {
        return this.subject;
    }

    public SetTextFilter(regex: string) {
        this.regex = regex;
        this.RefreshData();
    }

    public SetTicketStateFilter(regex: string) {
    }
}
