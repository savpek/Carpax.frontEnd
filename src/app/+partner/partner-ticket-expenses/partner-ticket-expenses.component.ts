import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '<cx-ticket-expenses-form [ticketId]="ticketId"></cx-ticket-expenses-form>"',
})
export class PartnerTicketExpensesComponent {
  public ticketId: string;

  constructor(private route: ActivatedRoute) {
            route.parent.params.subscribe(params => {
              if (!params['ticketId']) {
                throw 'params[ticketId]';
              }
              this.ticketId = params['ticketId'];
        });
  }
}
