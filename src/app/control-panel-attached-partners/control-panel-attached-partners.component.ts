import { Component, OnInit } from '@angular/core';
import { AttachedPartnerRepo, IAttachedPartner } from '../data/attachedPartnerRepo';
import { FormContext } from '../service/formContext';

@Component({
  selector: 'cx-control-panel-attached-partners',
  templateUrl: './control-panel-attached-partners.component.html',
  styleUrls: ['./control-panel-attached-partners.component.scss'],
  providers: [AttachedPartnerRepo, FormContext]
})
export class ControlPanelAttachedPartnersComponent {
  public attachedPartners: IAttachedPartner[] = [];

  public guidRegexp: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  constructor(private attachedPartnerRepo: AttachedPartnerRepo) {
    attachedPartnerRepo.get().subscribe(x => this.attachedPartners = x);
  }

  public save() {
    let current = this.attachedPartners;
    current.filter(x => x.transient === 'new').forEach(x => this.attachedPartnerRepo.add(x));
    current.filter(x => x.transient === 'delete').forEach(x => this.attachedPartnerRepo.delete(x));
  }

  public add() {
    this.attachedPartners.push({
      partnerId: '',
      description: '',
      transient: 'new'
    });
  }

  public delete(attachedPartner: IAttachedPartner) {
    attachedPartner.transient = 'delete';
  }

  public restore(attachedPartner: IAttachedPartner) {
    attachedPartner.transient = undefined;
  }
}
