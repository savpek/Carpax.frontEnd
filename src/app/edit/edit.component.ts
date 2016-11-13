import { FormContext } from '../service/formContext';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [FormContext]
})
export class EditComponent {
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
  }
}
