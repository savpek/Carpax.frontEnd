import { IPartner, PartnerRepo } from '../../data/partnerRepo';
import { FormContext } from '../../shared.cxform/formContext';
import { ITicket, TicketRepo } from '../../data/ticketRepo';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateForm } from '../../shared.cxform/canDeactivateForm';
import { CxModal } from '../../service/modal';

@Component({
  selector: 'cx-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [FormContext, PartnerRepo, TicketRepo]
})
export class EditFormComponent extends CanDeactivateForm {
  public ticket: ITicket = {
    id: ''
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

    this.activeRoute.params.subscribe(params => {
      let ticketId = params['id'];

      this.ticketRepo.Get(ticketId).subscribe(ticket => this.ticket = ticket);

      this.partnerRepo.GetCurrentForTicket(ticketId).subscribe(partner => {
        if (!partner[0].partnerId) { return; };

        this.currentPartnerId = partner[0].partnerId;
        this.currentPartnerIdChange.emit(this.currentPartnerId);
      });
    });
  }

  public saveDisabled() {
    return !this.form.isValid();
  }

  private saveRoutine() {
    return Observable.forkJoin(
      this.ticketRepo.Update(this.ticket),
      this.partnerRepo.UpdateCurrentForTicket(this.ticket.id, this.currentPartnerId)
    );
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
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
