import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '<cx-ticket-files-form [ticketId]="ticketId"></cx-ticket-files-form>',
})
export class ViewFilesComponent {
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
