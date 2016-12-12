import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '<cx-ticket-files-form [ticketId]="ticketId"></cx-ticket-files-form>"',
})
export class FilesComponent {
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
