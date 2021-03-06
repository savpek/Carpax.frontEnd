import { FormContext, FormEntry } from '../formContext';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Clipboard from 'clipboard-js';

@Component({
  selector: 'cx-form-text-input-small',
  templateUrl: './form-text-input-small.component.html',
  styleUrls: ['./form-text-input-small.component.scss']
})
export class FormTextInputSmallComponent {
  public entry: FormEntry;

  @Input() text: string;
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() headerIcon: string;
  @Input() headerText: string;

  @Input() footerText: string;
  @Input() footerIcon: string;

  @Input() clipboard: false;

  @Input() constraint = '.';

  @Input() disabled = false;

  @Input() format: string;

  @Input() maxlength: 100000;

  @Input() placeholder = '';

  constructor(private form: FormContext) {
    this.entry = form.Join();
  }

  private applyFormat(text: string): string {
    switch (this.format) {
      case 'uppercase':
        return text.toUpperCase();
      case 'money':
        return text.replace(',', '.');
      case 'percent':
        return text.replace(',', '.');
      default:
        return text;
    }
  }

  inputEvent(event: any) {
      this.entry.isDirty = true;
      this.text = this.applyFormat(event.target.value);
      this.textChange.emit(this.text);
  }

  keyPress(event: any) {
      let matcher = new RegExp(this.constraint, 'i')

      if (!matcher.test(event.key)) {
        event.preventDefault();
        return;
      }
  }

  copy(event: any) {
    Clipboard.copy(this.text);
  }
}
