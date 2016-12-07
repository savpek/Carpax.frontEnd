import { FormContext } from '../shared.cxform/formContext';
import { IPartner, PartnerRepo } from '../data/partnerRepo';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-control-panel-partners',
  templateUrl: './control-panel-partners.component.html',
  styleUrls: ['./control-panel-partners.component.scss'],
  providers: [PartnerRepo, FormContext]
})
export class ControlPanelPartnersComponent {
  public partners: IPartner[] = [];

  constructor(private partnerRepo: PartnerRepo) {
    partnerRepo.Get()
      .subscribe(
        partners => {
          this.partners = partners;
        });
  }

  public delete(partner: IPartner) {
    partner.transient = 'delete';
  }

  public restore(partner: IPartner) {
    partner.transient = undefined;
  }

  public buildUri(partner: IPartner) {
    return partner.id;
  }

  public save() {
    let current = this.partners;
    current.filter(x => x.transient === 'new')
      .forEach(x => this.partnerRepo.Add(x));

    current.filter(x => x.transient === 'delete')
      .forEach(x => this.partnerRepo.Delete(x));
  }

  public add() {
    this.partners.push({
      id: '',
      name: '',
      pin: '',
      transient: 'new'
    });
  }
}
