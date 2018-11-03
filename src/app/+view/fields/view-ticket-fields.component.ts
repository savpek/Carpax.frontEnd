import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketRepo } from 'app/data/ticketRepo';
import { FormContext } from 'app/shared.cxform/formContext';
import { PartnerRepo } from 'app/data/partnerRepo';
import { ITicket } from '../../data/ticketRepo';

@Component({
  templateUrl: './view-ticket-fields.component.html',
  providers: [FormContext, TicketRepo, PartnerRepo]
})
export class TicketFieldsComponent {
  public ticket: ITicket = {
    data: {},
    schema: []
  };

  constructor(private activeRoute: ActivatedRoute, private ticketRepo: TicketRepo, private form: FormContext) {
    this.newMethod();
  }

  private newMethod() {
    this.activeRoute.parent.params.subscribe(params => {
      if (!params['ticketId']) {
        throw `Assert: params['ticketId']`;
      }
      this.ticketRepo.Get(params['ticketId'])
        .subscribe(ticket => this.ticket = ticket);
    });
  }

  public saveDisabled() {
    return !this.form.isValid();
  }

  public isPersistable(): boolean {
    return !!this.ticket.schema
      .reduce((a, b) => b.items && a.concat(b.items), [])
      .some(x => !!x.alwaysAllowEdit)
  }

  public save() {
    this.ticketRepo.Update(this.ticket).subscribe(() => this.form.submitted())
  }
}
