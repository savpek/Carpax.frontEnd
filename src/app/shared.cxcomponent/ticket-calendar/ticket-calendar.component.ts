import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { ITicketHeader } from '../../data/ticketHeaderRepo';
import * as $ from 'jquery';
import 'fullcalendar';

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
      header:{
          right: 'prev,next'
      },
      timezone: 'local',
      height: 'parent',
      contentHeight: 'auto',
      events: []
  }

  @Input()
  set tickets(value: ITicketHeader[]) {
    this.config.events = value
            .filter(x => x.workStartDate && x.workEndDate)
            .map(x => {
                return {
                    title: `${x.registerPlate}, ${x.customer}`,
                    start: x.workStartDate,
                    end: x.workEndDate,
                    allDay: true,
                    url: `./edit/${x.id}`
                }});

    setTimeout(() => {
        $('cx-ticket-calendar').fullCalendar(this.config);
    }, 1500);
  }

  constructor(private changeRef: ApplicationRef) { }
}
