import { TicketHeaderServiceFactory, ITicketHeaderFilter, TicketState } from '../service/ticketHeaderService';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'cx-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
  providers: []
})
export class TicketFilterComponent {
  private filter: Subject<string> = new Subject<string>();
  private headerFilter: ITicketHeaderFilter;

  constructor(private headerService: TicketHeaderServiceFactory) {
    this.headerFilter = this.headerService.create();

    this.filter
      .debounceTime(700)
      .subscribe(x =>
        this.headerFilter.textFilter(x));
  }

  public textFilterChanged($newValue) {
    this.filter.next($newValue);
  }

  public showReadyFilter(value: string) {
    switch(value) {
      case 'nonready':
        this.headerFilter.stateFilter(TicketState.nonready);
        break;
      case 'ready':
        this.headerFilter.stateFilter(TicketState.ready);
        break;
      default:
        this.headerFilter.stateFilter(TicketState.all);
    }
  }
}
