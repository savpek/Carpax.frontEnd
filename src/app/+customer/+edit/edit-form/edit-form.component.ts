import { PartnerRepo } from 'app/data/partnerRepo';
import { FormContext } from 'app/shared.cxform/formContext';
import { ITicket, TicketRepo } from 'app/data/ticketRepo';
import { Component, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateForm } from 'app/shared.cxform/canDeactivateForm';
import { CxModal } from 'app/service/modal';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'cx-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [FormContext, PartnerRepo, TicketRepo]
})
export class EditFormComponent extends CanDeactivateForm {
  public ticket: ITicket = {
    data: {},
    schema: []
  };

  public currentPartnerId: string;
  public currentPartnerIdChange = new EventEmitter();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private ticketRepo: TicketRepo,
    private partnerRepo: PartnerRepo,
    private form: FormContext,
    modal: CxModal) {
    super(form, modal);

    this.activeRoute.parent.params.subscribe(params => {
      let ticketId = params['id'];

      this.ticketRepo.Get(ticketId)
        .pipe(retry(10))
        .subscribe(ticket => {
          this.ticket = ticket
      });

      this.partnerRepo.GetCurrentForTicket(ticketId).subscribe(partner => {
        if (partner.length === undefined || partner.length === 0 || !partner[0].partnerId) { return; };
        this.currentPartnerId = partner[0].partnerId;
        this.currentPartnerIdChange.emit(this.currentPartnerId);
      });

    });
  }

  public saveDisabled() {
    return !this.form.isValid();
  }

  private saveRoutine() {
      this.partnerRepo.UpdateCurrentForTicket(this.ticket.id, this.currentPartnerId)
      return this.ticketRepo.Update(this.ticket)
  }


  public save() {
    this.saveRoutine().subscribe(() => this.form.submitted());
  }

  public cancel() {
    this.form.submitted();
    this.router.navigateByUrl('/');
  }

  public extracActions(event) {
    this.ticketRepo.Delete(this.ticket)
      .subscribe(() =>
        this.router.navigateByUrl('/'));
  }
}
