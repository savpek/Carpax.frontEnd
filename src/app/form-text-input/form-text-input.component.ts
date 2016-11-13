import { FormContext, FormEntry } from '../service/formContext';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cx-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.scss']
})
export class FormTextInputComponent implements OnChanges {
  @Input() public text: string = '';
  @Output() textChange = new EventEmitter<number>();

  @Input() public validate;
  @Input() public label: string = 'DEFAULT LABEL';

  @Input() public disabled = false;

  public entry: FormEntry;

  constructor(form: FormContext) {
    this.entry = form.Join();
  }

  public keyboardEvent() {
    this.entry.isDirty = true;
    this.validateData();
  }

  private validateData() {
    if (!this.validate) {
      this.entry.isValid = true;
      return;
    }

    if (!this.text) {
      this.entry.isValid = false;
      return;
    }

    this.entry.isValid = !!this.text.match(this.validate);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.validateData()
  }
}
