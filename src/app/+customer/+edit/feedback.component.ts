import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormContext } from 'app/shared.cxform/formContext';

@Component({
  template: '<cx-ticket-feedback-form [ticketId]="ticketId"></cx-ticket-feedback-form>',
  providers: [FormContext]
})
export class FeedbackComponent {
  public ticketId: string;

  constructor(private route: ActivatedRoute) {
            route.parent.params.subscribe(params => {
              if (!params['id']) {
                throw 'params[id]';
              }
              this.ticketId = params['id'];
        });
  }
}
