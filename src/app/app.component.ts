import { TicketHeaderService } from './service/ticketHeaderService';
import { TicketHeaderRepo } from './data/ticketHeaderRepo';
import { Component,  } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TicketHeaderRepo, TicketHeaderService]
})

export class AppComponent {
}

