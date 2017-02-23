import { TicketHeaderServiceFactory, ITicketHeaderFilter, TicketState } from '../../service/ticketHeaderService';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
  providers: []
})
export class TicketFilterComponent implements OnInit {
  private filter: Subject<string> = new Subject<string>();
  private headerFilter: ITicketHeaderFilter;

  @Input()
  public mode: string = "customer"

  constructor(private headerService: TicketHeaderServiceFactory, private activeRoute: ActivatedRoute) {
    this.filter
      .debounceTime(500)
      .subscribe(x =>
        this.headerFilter.textFilter(x));
  }

  ngOnInit() {
    switch(this.mode) {
      case "customer":
        this.activeRoute.params.subscribe(params => this.headerFilter = this.headerService.create());
        break;
      case "partner":
        this.activeRoute.parent.params.subscribe(params => this.headerFilter = this.headerService.createForPartner(params['partnerId']));
        break;
      default:
        throw `Invalid ticket filter mode '${this.mode}'`
    }
  }

  public textFilterChanged($newValue) {
    this.filter.next($newValue);
  }

  public showReadyFilter(value: string) {
    switch (value) {
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
