import { TicketHeader } from './ticketHeader';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'cx-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  public tickets: Observable<TicketHeader>;

  constructor(private http: Http) {}

  ngOnInit() {
    this.tickets = this.http.get('http://localhost:5000/api/ticket/')
      .map(response => {
        return response.json().map(x => new TicketHeader(x.registerPlate));
      });
  }
}
