import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PartnerRepo } from '../../data/partnerRepo';
import { CanDeactivate } from '@angular/router';
import { CxModal } from '../../service/modal';
import { Observable } from 'rxjs';
import { CanDeactivateFormGuard } from '../../service/canDeactivateFormGuard';


@Component({
  selector: 'cx-ticket-fields',
  templateUrl: './ticket-fields.component.html',
  styleUrls: ['./ticket-fields.component.scss']
})
export class TicketFieldsComponent implements CanDeactivateFormGuard {
  @Input()
  public ticket: any = {};

  public insuranceTypes: any[] = [
    { text: 'Liikenne', value: 0 },
    { text: 'Kasko', value: 1 },
    { text: 'Vastuuvakuutus', value: 2 },
    { text: 'Asiakas maksaa', value: 3 }
  ];

  public accidentTypes: any[] = [
    { text: 'Törmäys', value: 0 },
    { text: 'Ilkivalta', value: 1 },
    { text: 'Parkkipaikka', value: 2 },
    { text: 'Varkaus', value: 3 },
    { text: 'Palo', value: 4 },
    { text: 'Lasivakuutus', value: 5 }
  ];

  public partners: any[] = [];

  @Input()
  public currentPartnerId: string;

  @Output()
  public currentPartnerIdChange = new EventEmitter();

  constructor(private partnerRepo: PartnerRepo, private modal: CxModal) {
    this.partnerRepo.Get().subscribe(
      result => this.partners = result.map<any>(partnerMap => { return { text: partnerMap.name, value: partnerMap.id }; }));
  }

  canDeactivate() {
    console.log('i am navigating away');
    return window.confirm('Discard changes?');
  }
}
