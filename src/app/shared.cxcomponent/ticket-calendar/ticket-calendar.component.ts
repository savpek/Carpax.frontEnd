import { Component, OnInit, Input, ApplicationRef, ViewChild, AfterViewInit } from '@angular/core';
import { ITicketHeader, ITicketHeaders } from 'app/data/ticketHeaderRepo';
import * as jQuery from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { element } from 'protractor';
import { pipe } from '@angular/core/src/render3/pipe';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-ticket-calendar',
  templateUrl: './ticket-calendar.component.html',
  styleUrls: ['./ticket-calendar.component.scss']
})
export class TicketCalendarComponent implements AfterViewInit {
  public config: any = {
    editable: false,
    firstDay: 1,
    dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
    titleFormat: 'MM / YYYY',
    header: {
      right: 'prev,next'
    },
    timezone: 'local',
    height: 'parent',
    contentHeight: 'auto',
    events: []
  }

  @ViewChild('calendar')
  private calendar: any;

  private getEndDate(header: ITicketHeader, schema: any): Date {
    if (header.data[schema.endDateSelector]) {
      return moment(header.data[schema.endDateSelector]).add(1, 'days').toDate();
    }

    return header.data[schema.startDateSelector];
  }

  private getEventColor(header: ITicketHeader) {
    if (!header.ready) {
      return '#f0ad4e';
    }
    return '#449d44';
  }

  @Input()
  set tickets(value: Observable<ITicketHeaders>) {
    value.subscribe(ticketsResponse => {
      let events = ticketsResponse.tickets
        .filter(x => x.data[ticketsResponse.calendarSchema.startDateSelector])
        .map(x => {
          return {
            title: `${x.data[ticketsResponse.calendarSchema.titleField]}`,
            start: x.data[ticketsResponse.calendarSchema.startDateSelector],
            end: this.getEndDate(x, ticketsResponse.calendarSchema),
            allDay: true,
            url: `./customer/edit/${x.id}/fields`,
            color: this.getEventColor(x)
          }
        });

      this.config.events = events;

      jQuery(this.calendar.nativeElement).fullCalendar('removeEvents');
      jQuery(this.calendar.nativeElement).fullCalendar('addEventSource', events)
      jQuery(this.calendar.nativeElement).fullCalendar('rerenderEvents');
  });
}

ngAfterViewInit() {
  setTimeout(() => jQuery(this.calendar.nativeElement).fullCalendar(this.config), 100);
}

constructor() {
}
}
