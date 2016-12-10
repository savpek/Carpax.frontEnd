import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITicketHeader } from '../../data/ticketHeaderRepo';

@Component({
  selector: 'cx-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  @Input()
  public tickets: ITicketHeader[] = [];

  @Output()
  public openTicket: EventEmitter<ITicketHeader> = new EventEmitter<ITicketHeader>();

  public openTicketClick(ticket: ITicketHeader) {
    this.openTicket.emit(ticket);
  }
}
