import { Component, OnInit } from '@angular/core';
import { AttachedPartnerRepo, IAttachedPartner } from '../../../data/attachedPartnerRepo';
import { FormContext } from '../../../shared.cxform/formContext';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cx-control-panel-attached-partners',
  templateUrl: './control-panel-attached-partners.component.html',
  styleUrls: ['./control-panel-attached-partners.component.scss'],
  providers: [AttachedPartnerRepo, FormContext]
})
export class ControlPanelAttachedPartnersComponent {
  public attachedPartners: IAttachedPartner[] = [];

  public guidRegexp: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  constructor(private attachedPartnerRepo: AttachedPartnerRepo, private modal: Modal, private toast: ToastrService) {
    attachedPartnerRepo.get().subscribe(x => this.attachedPartners = x);
  }

  public save() {
    let current = this.attachedPartners;
    current.filter(x => x.transient === 'new')
      .forEach(x => this.attachedPartnerRepo.add(x)
        .subscribe(_ => {}, err => this.toast.error('Virheellinen tunniste tai PIN')));
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

  public changeIdModal(partner: IAttachedPartner) {
    if (partner.transient !== 'new') {
      return;
    }

    this.modal.prompt()
    .size('lg')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title('Kumppanilinkki')
    .body('Pyydä kumppanilinkki ja syötä se tähän. Tällöin näet kyseisen kumppanin tapahtumat etusivullasi.')
    .placeholder('https://www.carpax.fi/app/partner/8c70a2x2-60a1-2822-8544-80sxe70ie9e6/tickets')
    .okBtn('Hyväksy')
    .cancelBtn('Peruuta')
    .open()
    .then(r => r.result)
    .then(inputValue => {
      let guidCandidate = /http.*\/(.*?)\/tickets/.exec(inputValue.toString());

      if (!guidCandidate || !this.guidRegexp.test(guidCandidate[1])) {
        this.toast.error('Virheellinen linkki. Kumppanin tunnistetta ei löydy.')
        return;
      }

      partner.partnerId = guidCandidate[1];
    });
  }
}
