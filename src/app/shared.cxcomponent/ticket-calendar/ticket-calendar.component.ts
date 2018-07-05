import { Component, OnInit, Input, ApplicationRef, ViewChild, AfterViewInit } from '@angular/core';
import { ITicketHeader } from 'app/data/ticketHeaderRepo';
import * as jQuery from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { element } from 'protractor';
import { TicketSchema } from '../../service/ticketSchema';
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

  private current: Observable<ITicketHeader[]>;

  private eventCallback: (any) => void = (_) => { };

  private getEndDate(header: ITicketHeader, schema): Date {
    if (header.data[schema.calendar.endDateSelector]) {
      return moment(header.data[schema.calendar.endDateSelector]).add(1, 'days').toDate();
    }

    return header.data[schema.calendar.startDateSelector];
  }

  private getEventColor(header: ITicketHeader) {
    if (!header.ready) {
      return '#f0ad4e';
    }
    return '#449d44';
  }

  @Input()
  set tickets(value: Observable<ITicketHeader[]>) {
    this.schema.get().pipe(take(1)).subscribe(schema => {
      value.subscribe(tickets => {
        let events = tickets
          .filter(x => x.data[schema.calendar.startDateSelector])
          .map(x => {
            return {
              title: `${x.data[schema.calendar.titleField]}`,
              start: x.data.workStartDate,
              end: this.getEndDate(x, schema),
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
    })
  }

  ngAfterViewInit() {
    setTimeout(() => jQuery(this.calendar.nativeElement).fullCalendar(this.config), 100);
  }

  constructor(private schema: TicketSchema) {
  }
}
