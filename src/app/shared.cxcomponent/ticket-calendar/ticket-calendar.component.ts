import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { ITicketHeader } from 'app/data/ticketHeaderRepo';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';

@Component({
  selector: 'cx-ticket-calendar',
  templateUrl: './ticket-calendar.component.html',
  styleUrls: ['./ticket-calendar.component.scss']
})
export class TicketCalendarComponent {
  public config: any = {
      editable: false,
      firstDay: 1,
      dayNamesShort:['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
      titleFormat: 'MM / YYYY',
      header: {
          right: 'prev,next'
      },
      timezone: 'local',
      height: 'parent',
      contentHeight: 'auto',
      events: []
  }

  private eventCallback: (any) => void = (_) => {};

  private getEndDate(header: ITicketHeader): Date {
    if (header.workEndDate) {
      return moment(header.workEndDate).add(1, 'days').toDate();
    }

    return header.workStartDate;
  }

  private getEventColor(header: ITicketHeader) {
    if (!header.ready) {
      return '#f0ad4e';
    }
    return '#449d44';
  }

  @Input()
  set tickets(value: ITicketHeader[]) {
    let events = value
            .filter(x => x.workStartDate)
            .map(x => {
                return {
                    title: `${x.registerPlate}, ${x.customer}`,
                    start: x.workStartDate,
                    end: this.getEndDate(x),
                    allDay: true,
                    url: `./customer/edit/${x.id}/fields`,
                    color: this.getEventColor(x)
                }});

    setTimeout(() => {
        this.config.events = events;
        $('cx-ticket-calendar').fullCalendar(this.config);
    }, 500);
  }

  constructor(private changeRef: ApplicationRef) {
   }
}
