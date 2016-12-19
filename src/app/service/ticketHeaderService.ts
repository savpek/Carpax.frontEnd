import { TicketHeaderRepoFactory, ITicketHeaderRepo, ITicketHeader } from '../data/ticketHeaderRepo';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toArray';

@Injectable()
export class TicketHeaderServiceFactory {
    private headerService: TicketHeaderService;

    constructor(private factory: TicketHeaderRepoFactory) {
    }

    public create(): TicketHeaderService {
        if (this.headerService) {
            return this.headerService;
        }

        this.headerService = new TicketHeaderService(this.factory.create());
        return this.headerService;
    }

    public createForPartner(partnerId: string): TicketHeaderService {
        return new TicketHeaderService(this.factory.createForPartner(partnerId));
    }
}

export interface ITicketHeaderFilter {
    textFilter(filter: string): string;
    stateFilter(state: TicketState): TicketState;
}

export enum TicketState {
    ready, nonready, all
}

export class TicketHeaderService implements ITicketHeaderRepo {
    private allTickets: ITicketHeader[] = [];
    private subject: BehaviorSubject<ITicketHeader[]> = new BehaviorSubject<ITicketHeader[]>([]);

    private regex: string;
    private state: TicketState = TicketState.all;

    private textfilterFunc = (x: ITicketHeader) : boolean => {
        let isMatch = (item) =>
            item && item.match(`.*${this.regex}.*`);

        if (this.regex) {
            return isMatch(x.registerPlate) || isMatch(x.customer) || isMatch(x.model);
        }
        return true;
    };

    private stateFilterFunc = (x: ITicketHeader) : boolean => {
        switch(this.state) {
            case TicketState.all:
                return true;
            case TicketState.ready:
                return x.ready;
            case TicketState.nonready:
                return !x.ready;
            default:
                return false;
        }
    }

    constructor(private repo: ITicketHeaderRepo) {
        repo.get()
        .subscribe(x => {
            this.allTickets = x;
            this.subject.next(this.allTickets.slice());
        });
    }

    private refresh() {
        this.subject.next(this.allTickets
            .filter(this.textfilterFunc)
            .filter(this.stateFilterFunc));
    }

    public get(): Observable<ITicketHeader[]> {
        return this.subject;
    }

    public textFilter(regex: string): string {
        this.regex = regex;
        this.refresh();
        return regex;
    }

    public stateFilter(state: TicketState): TicketState {
        this.state = state;
        this.refresh();
        return state;
    }
}