import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { ITicketHeader, ITicketHeaders } from '../../data/ticketHeaderRepo';
import { NotificationRepo } from '../../data/notificationRepo';
import * as moment from 'moment';
import { Observable, BehaviorSubject, zip, combineLatest } from 'rxjs';

@Component({
  selector: 'cx-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  providers: []
})
export class TicketListComponent implements OnChanges {
  @Input()
  public tickets: Observable<ITicketHeader[]>;

  @Input()
  public schema = [];

  @Output()
  public openTicket: EventEmitter<ITicketHeader> = new EventEmitter<ITicketHeader>();

  public ticketsWithNotifications: BehaviorSubject<Array<ITicketHeader | { hasNotification: boolean }>> = new BehaviorSubject([]);

  constructor(private notificationRepo: NotificationRepo) {
  }

  ngOnChanges() {
    combineLatest(
      this.notificationRepo.get(),
      this.tickets
    )
      .subscribe(result => {
        let withNotifications = result[1]
          .map((t: any) => {
            t.hasNotification = !!result[0].find(n => n.ticketId === t.id);
            return t;
          });

        this.ticketsWithNotifications.next(withNotifications);
      });
  }

  public openTicketClick(ticket: ITicketHeader) {
    this.openTicket.emit(ticket);
  }

  public format(value: string) {
    let timeCandidate = moment(value);

    if (value && timeCandidate.isValid()) {
      return timeCandidate.format('DD.MM.YYYY HH:mm');
    }

    return value;
  }
}
