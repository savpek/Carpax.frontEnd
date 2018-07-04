import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketFilter, ITicketHeaderFilter, TicketState } from 'app/service/ticketFilter';
import { debounceTime, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'cx-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
  providers: []
})
export class TicketFilterComponent {
  private filter: Subject<string> = new Subject<string>();

  @Input()
  public mode = 'customer'

  constructor(private ticketFilter: TicketFilter, private activeRoute: ActivatedRoute) {
    this.filter
      .pipe(debounceTime(500))
      .subscribe(x =>
        this.ticketFilter.textFilter(x));
  }

  public textFilterChanged($newValue) {
    this.filter.next($newValue);
  }

  public showReadyFilter(value: string) {
    switch (value) {
      case 'nonready':
        this.ticketFilter.stateFilter(TicketState.nonready);
        break;
      case 'ready':
        this.ticketFilter.stateFilter(TicketState.ready);
        break;
      default:
        this.ticketFilter.stateFilter(TicketState.all);
    }
  }
}
