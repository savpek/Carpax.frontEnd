import { IPartner, PartnerRepo } from '../data/partnerRepo';
import { DropdownItem } from '../dropdown/dropdown.component';
import { FormContext } from '../service/formContext';
import { ITicket, TicketRepo } from '../data/ticketRepo';
import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Uuid } from './utils';

@Component({
  selector: 'cx-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [FormContext, PartnerRepo]
})
export class EditFormComponent {
  public ticket: ITicket = {
    id: ''
  };

  public insuranceTypes: DropdownItem[] = [
    { text: 'Liikenne', value: 0 },
    { text: 'Kasko', value: 1 },
    { text: 'Vastuuvakuutus', value: 2 },
    { text: 'Asiakas maksaa', value: 3 }
  ];

  public accidentTypes: DropdownItem[] = [
    { text: 'Törmäys', value: 0 },
    { text: 'Ilkivalta', value: 1 },
    { text: 'Parkkipaikka', value: 2 },
    { text: 'Varkaus', value: 3 },
    { text: 'Palo', value: 4 },
    { text: 'Lasivakuutus', value: 5 }
  ];

  public partners: DropdownItem[] = [];
  public currentPartnerId: string;
  public currentPartnerIdChange = new EventEmitter();

  private new: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private ticketRepo: TicketRepo,
    private partnerRepo: PartnerRepo,
    private form: FormContext) {
    activeRoute.params.subscribe(params => {
      let ticketId = params['id'];
      if (!ticketId) {
        ticketId = Uuid.create();
        this.new = true;
      }

      ticketRepo.Get(ticketId).subscribe(ticket => this.ticket = ticket);

      if (!this.new) {
        partnerRepo.GetCurrentForTicket(ticketId).subscribe(partner => {
          if (!partner[0].partnerId) { return; };

          this.currentPartnerId = partner[0].partnerId;
          this.currentPartnerIdChange.emit(this.currentPartnerId);
        });
      }
    });

    partnerRepo.Get().subscribe(
      result => this.partners = result.map<DropdownItem>(partnerMap => { return { text: partnerMap.name, value: partnerMap.id}; }));
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
    if (this.new) {
      this.saveRoutine().subscribe(() => {
        this.form.submitted();
        this.router.navigateByUrl(`/edit/${this.ticket.id}`);
      });
    } else {
      this.saveRoutine().subscribe(() => this.form.submitted());
    }
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
