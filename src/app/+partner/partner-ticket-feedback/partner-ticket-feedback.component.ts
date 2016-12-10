import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '<cx-ticket-feedback-form [ticketId]="ticketId"></cx-ticket-feedback-form>"',
})
export class PartnerTicketFeedbackComponent {
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
