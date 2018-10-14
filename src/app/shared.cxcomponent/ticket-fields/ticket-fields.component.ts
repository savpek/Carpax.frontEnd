import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PartnerRepo } from 'app/data/partnerRepo';
import { ITicket } from '../../data/ticketRepo';

@Component({
  selector: 'cx-ticket-fields',
  templateUrl: './ticket-fields.component.html',
  styleUrls: ['./ticket-fields.component.scss'],
  providers: []
})
export class TicketFieldsComponent {
  @Input()
  public ticket: ITicket = {
    data: {},
    schema: []
  };

  public readyTypes: any[] = [
    { text: 'Kyllä', value: true },
    { text: 'Ei', value: false }
  ]

  public partners: any[] = [];

  @Input()
  public currentPartnerId: string;

  @Output()
  public currentPartnerIdChange = new EventEmitter();

  constructor(private partnerRepo: PartnerRepo) {
    this.partnerRepo.Get().subscribe(
      result => {
        this.partners = result.map<any>(partnerMap => { return { text: partnerMap.name, value: partnerMap.id }; })
        this.partners.unshift({text: 'Ei valintaa', value: undefined});
  });
  }

  public currentPartnerUpdated(partnerSelection: any) {
    this.currentPartnerId = partnerSelection;
    this.currentPartnerIdChange.emit(partnerSelection);
  }
}
