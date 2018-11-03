import { LocalStorage } from 'app/service/localStorage';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITicketHeader } from 'app/data/ticketHeaderRepo';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

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

    private regex: RegExp;
    private state: TicketState = TicketState.all;
    private dateFilter: moment.Moment;

    private textfilterFunc = (header: ITicketHeader): boolean => {
        if (this.regex || (this.dateFilter && this.dateFilter.isValid())) {
            let isMatch = (item): boolean => {
                return (item && this.regex.test(String(item).toLocaleLowerCase()))
                        || (item && moment(String(item)).isValid()
                            && moment(String(item)).diff(this.dateFilter, 'days') === 0);
            };

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

    public textFilter(searchString: string): string {
        this.dateFilter = moment(searchString, 'DD.MM.YYYY');
        this.regex = new RegExp(`.*${searchString.toLocaleLowerCase()}.*`);
        this.subject.next(this.combinedFilterFunction);
        return searchString;
    }

    public stateFilter(state: TicketState): TicketState {
        this.state = state;
        this.storage.set('currentStateFilter', this.state);
        this.subject.next(this.combinedFilterFunction);
        return state;
    }
}
