import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormEntry, FormContext } from '../formContext';

@Component({
  selector: 'cx-form-dropdown-input',
  templateUrl: './form-dropdown-input.component.html',
  styleUrls: ['./form-dropdown-input.component.scss']
})
export class FormDropdownInputComponent {
  @Input() public label: string = 'DEFAULT LABEL';
  @Input() public disabled = false;
  @Input() public required: boolean;
  @Input() public dropdownHeader: string;

  @Input() public value: any;
  @Output() public valueChange = new EventEmitter();

  @Input() public items: any[];

  public entry: FormEntry;

  constructor(private form: FormContext) {
    this.entry = form.Join();
    this.valueChange.asObservable().subscribe(x =>
      this.entry.isDirty = true);
  }

  public isDisabled(): boolean {
    return this.disabled;
  }
}
