import { FormContext, FormEntry } from '../service/formContext';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cx-form-text-input-small',
  templateUrl: './form-text-input-small.component.html',
  styleUrls: ['./form-text-input-small.component.scss']
})
export class FormTextInputSmallComponent {
  private entry: FormEntry;

  @Input() text: string;
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() headerIcon: string;
  @Input() headerText: string;

  @Input() footerText: string;
  @Input() footerIcon: string;

  @Input() constraint: string = '.';

  @Input() disabled: boolean = false;

  @Input() format: string;

  constructor(private form: FormContext) {
    this.entry = form.Join();
  }

  private applyFormat(text: string): string {
    switch (this.format) {
      case 'uppercase':
        return text.toUpperCase();
      default:
        return text;
    }
  }

  keyUpPress(event: any) {
      this.entry.isDirty = true;
      this.text = this.applyFormat(event.target.value);
      this.textChange.emit(this.text);
  }

  keyPress(event: any) {
      let inputChar = String.fromCharCode(event.charCode);

      let matcher = new RegExp(this.constraint, 'i')

      if (!matcher.test(inputChar)) {
        event.preventDefault();
        return;
      }
  }
}
