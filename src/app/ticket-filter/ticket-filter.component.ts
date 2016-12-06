import { TicketHeaderServiceFactory } from '../service/ticketHeaderFilter';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'cx-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
  providers: []
})
export class TicketFilterComponent implements OnInit {
  private filter: Subject<string> = new Subject<string>();

  constructor(private headerService: TicketHeaderServiceFactory) {
    this.filter
      .debounceTime(700)
      .subscribe(x =>
        this.headerService.create().textFilter(x));
  }

  ngOnInit() {
  }

  public textFilterChanged($newValue) {
    this.filter.next($newValue);
  }

  public showReadyFilter(value: string) {
  }
}
