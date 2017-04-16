import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormEntry, FormContext } from 'app/shared.cxform/formContext';

@Component({
  selector: 'cx-form-text-area-input',
  templateUrl: './form-text-area-input.component.html',
  styleUrls: ['./form-text-area-input.component.scss']
})
export class FormTextAreaInputComponent {
  @Input() public text = '';
  @Output() textChange = new EventEmitter();

  @Input() public validate;
  @Input() public label = 'DEFAULT LABEL';

  @Input() public disabled = false;

  public entry: FormEntry;

  constructor(private form: FormContext) {
    this.entry = form.Join();
  }

  public rows(): number {
    let currentCount = this.text ? this.text.split(/\r\n|\r|\n/).length : 0;

    if (currentCount <= 5) {
      return 5;
    }

    return currentCount + 1;
  }

  public isDisabled(): boolean {
    return this.disabled || this.form.disabled;
  }

  public keyboardEvent() {
    this.textChange.emit(this.text);
  }
}
