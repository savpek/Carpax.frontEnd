import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITicketHeader } from '../../data/ticketHeaderRepo';
import { NotificationRepo, INotification } from '../../data/notificationRepo';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  providers: []
})
export class TicketListComponent {

  @Input()
  public tickets: Observable<ITicketHeader[]> = new BehaviorSubject([]);

  @Output()
  public openTicket: EventEmitter<ITicketHeader> = new EventEmitter<ITicketHeader>();

  private notifications: INotification[] = []

  constructor(private notificationRepo: NotificationRepo) {
    notificationRepo.get()
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  public hasNew(ticketId: string) {
    return !!this.notifications.find(x => x.ticketId === ticketId);
  }

  public openTicketClick(ticket: ITicketHeader) {
    this.openTicket.emit(ticket);
  }

  public formatLastModified(value: string) {
     return moment(value).format('DD.MM.YYYY HH:mm');
  }
}
