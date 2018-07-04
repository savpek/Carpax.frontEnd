import { LocalStorage } from 'app/service/localStorage';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITicketHeader } from 'app/data/ticketHeaderRepo';
import { Injectable } from '@angular/core';

export enum TicketState {
    ready, nonready, all
}

export interface ITicketHeaderFilter {
    textFilter(filter: string): string;
    stateFilter(state: TicketState): TicketState;
}

@Injectable()
export class TicketFilter {
    private subject: BehaviorSubject<(t: ITicketHeader[]) => ITicketHeader[]> =
        new BehaviorSubject<(t: ITicketHeader[]) => ITicketHeader[]>(t => []);

    private regex: string;
    private state: TicketState = TicketState.all;

    private textfilterFunc = (header: ITicketHeader): boolean => {
        let isMatch = (item) =>
            item && item.toLowerCase().match(`.*${this.regex.toLocaleLowerCase()}.*`);

        if (this.regex) {
            let dataMatches = Object.getOwnPropertyNames(header.data)
                .filter(propertyName => isMatch(header.data[propertyName]))

            return dataMatches.length > 0 || isMatch(header.partner);
        }
        return true;
    };

    private combinedFilterFunction =
        tickets => tickets
            .filter(this.textfilterFunc)
            .filter(this.stateFilterFunc)
            .sort((a, b) => a.lastModified > b.lastModified ? -1 : 1);

    private stateFilterFunc = (x: ITicketHeader): boolean => {
        switch (this.state) {
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

    constructor(private storage: LocalStorage) {
        let stateIfAny = this.storage.get('currentStateFilter');
        if (stateIfAny !== null) {
            this.state = <TicketState>stateIfAny;
        }

        this.subject.next(this.combinedFilterFunction);
    }

    public get(): Observable<(t: ITicketHeader[]) => ITicketHeader[]> {
        return this.subject;
    }

    public textFilter(regex: string): string {
        this.regex = regex;
        this.subject.next(this.combinedFilterFunction);
        return regex;
    }

    public stateFilter(state: TicketState): TicketState {
        this.state = state;
        this.storage.set('currentStateFilter', this.state);
        this.subject.next(this.combinedFilterFunction);
        return state;
    }
}
