import { FormContext } from '../../../shared.cxform/formContext';
import { IUser, UserRepo } from '../../../data/userRepo';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cx-control-panel',
  templateUrl: './control-panel-users.component.html',
  styleUrls: ['./control-panel-users.component.scss'],
  providers: [UserRepo, FormContext]
})
export class ControlPanelUsersComponent {
  public users: IUser[] = [];

  constructor(private userRepo: UserRepo, private toast: ToastrService) {
    userRepo.Get().subscribe(x => this.users = x);
  }

  public delete(item) {
    item.transient = 'delete';
  }

  public restore(item) {
    item.transient = undefined;
  }

  public addUser() {
    this.users.push({
      userName: '',
      transient: 'new'
    });
  }

  public save() {
    let current = this.users;
    current.filter(x => x.transient === 'delete').forEach(x => this.userRepo.Delete(x));
    current.filter(x => x.transient === 'new')
      .forEach(x =>
        this.userRepo.Add(x)
          .subscribe(() => {},
            error => this.toast.error(error)));
  }
}
