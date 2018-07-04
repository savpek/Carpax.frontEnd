import { PartnerRepo } from '../../data/partnerRepo';
import { FormContext } from '../../shared.cxform/formContext';
import { ITicket, TicketRepo } from '../../data/ticketRepo';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { flatMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './new-form.component.html',
  providers: [FormContext, PartnerRepo, TicketRepo]
})
export class NewFormComponent {
  public ticket: ITicket = {
    id: '00000000-0000-0000-0000-000000000000',
    data: {}
  };

  public currentPartnerId: string;

  constructor(
    private router: Router,
    private ticketRepo: TicketRepo,
    private partnerRepo: PartnerRepo,
    private form: FormContext) {
  }

  private saveRoutine() {
      return this.ticketRepo.Add(this.ticket)
        .pipe(
          tap(ticket => this.ticket = ticket),
          flatMap(() => this.partnerRepo.UpdateCurrentForTicket(this.ticket.id, this.currentPartnerId)))
  }

  public save() {
      this.saveRoutine().subscribe(() => {
        this.form.submitted();
        this.router.navigate(['customer', 'edit', this.ticket.id, 'fields']);
      });
  }

  public saveDisabled() {
    return !this.form.isValid();
  }

  public cancel() {
    this.form.submitted();
    this.router.navigateByUrl('/customer/tickets/own');
  }
}
