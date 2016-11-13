import { DropdownItem } from '../dropdown/dropdown.component';
import { FormContext } from '../service/formContext';
import { ITicket, TicketRepo } from '../data/ticketRepo';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [FormContext]
})
export class EditComponent {
  public ticket: ITicket = {
    id: ''
  };

  public insuranceTypes: DropdownItem[] = [
    {
      text: 'Liikenne',
      value: 0
    },
    {
      text: 'Kasko',
      value: 1
    },
    {
      text: 'Vastuuvakuutus',
      value: 2
    },
    {
      text: 'Asiakas maksaa',
      value: 3
    }
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
