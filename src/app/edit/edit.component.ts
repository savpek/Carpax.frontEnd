import { FormContext } from '../service/formContext';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [FormContext]
})
export class EditComponent {
  constructor() {
  }
}
