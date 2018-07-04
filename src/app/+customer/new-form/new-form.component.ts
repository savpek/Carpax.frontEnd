import { PartnerRepo } from '../../data/partnerRepo';
import { FormContext } from '../../shared.cxform/formContext';
import { ITicket, TicketRepo } from '../../data/ticketRepo';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Uuid } from './utils';
import { flatMap } from 'rxjs/operators';

@Component({
  templateUrl: './new-form.component.html',
  providers: [FormContext, PartnerRepo, TicketRepo]
})
export class NewFormComponent {
  public ticket: ITicket = {
    id: Uuid.create()
  };

  public currentPartnerId: string;

  constructor(
    private router: Router,
    private ticketRepo: TicketRepo,
    private partnerRepo: PartnerRepo,
    private form: FormContext) {
  }

  private saveRoutine() {
      return this.ticketRepo.Update(this.ticket)
        .pipe(flatMap(() => this.partnerRepo.UpdateCurrentForTicket(this.ticket.id, this.currentPartnerId)));
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
