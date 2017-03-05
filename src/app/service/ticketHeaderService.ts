import { TicketHeaderRepoFactory, ITicketHeaderRepo, ITicketHeader } from '../data/ticketHeaderRepo';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toArray';
import { LocalStorage } from './localStorage';

@Injectable()
export class TicketHeaderServiceFactory {
    private headerService: TicketHeaderService;
    private partnerHeaderService: TicketHeaderService;

    constructor(private factory: TicketHeaderRepoFactory, private storage: LocalStorage) {
    }

    public create(): TicketHeaderService {
        if (this.headerService) {
            return this.headerService;
        }

        this.headerService = new TicketHeaderService(this.factory.create(), this.storage);
        return this.headerService;
    }

    public createForPartner(partnerId: string): TicketHeaderService {
        if (this.partnerHeaderService) {
            return this.partnerHeaderService;
        }

        this.partnerHeaderService = new TicketHeaderService(this.factory.createForPartner(partnerId), this.storage);
        return this.partnerHeaderService;
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
            item && item.toLowerCase().match(`.*${this.regex.toLocaleLowerCase()}.*`);

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

    constructor(private repo: ITicketHeaderRepo, private storage: LocalStorage) {
        let stateIfAny = this.storage.get('currentStateFilter');
        if(stateIfAny !== null) {
            this.state = <TicketState>stateIfAny;
        }

        repo.get()
        .subscribe(x => {
            this.allTickets = x;
            this.refresh();
        });
    }

    private refresh() {
        this.subject.next(this.allTickets
            .filter(this.textfilterFunc)
            .filter(this.stateFilterFunc)
            .sort((a,b) => a.lastModified > b.lastModified ? -1 : 1));
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

        this.storage.set('currentStateFilter', this.state);
        
        this.refresh();
        return state;
    }
}
