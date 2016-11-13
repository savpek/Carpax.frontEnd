import { DropdownItem } from '../dropdown/dropdown.component';
import { FormContext } from '../service/formContext';
import { ITicket, TicketRepo } from '../data/ticketRepo';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cx-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
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

  constructor(private activeRoute: ActivatedRoute, private router: Router, private repo: TicketRepo, private form: FormContext) {
    activeRoute.params.subscribe(x => {
      repo.Get(x['id']).subscribe(ticket => this.ticket = ticket);
    });
  }

  public saveDisabled() {
    return false;
  }

  public save() {
    this.form.submitted();
    this.repo.Update(this.ticket);
  }

  public saveAndClose() {
    this.save();
    this.router.navigateByUrl('/');
  }

  public cancel() {
    this.router.navigateByUrl('/');
  }
}
