import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cx-form-text-input-small',
  templateUrl: './form-text-input-small.component.html',
  styleUrls: ['./form-text-input-small.component.scss']
})
export class FormTextInputSmallComponent {
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() value: string;
  @Input() headerIcon: string;
  @Input() headerText: string;

  @Input() footerText: string;
  @Input() footerIcon: string;

  @Input() constraint: string = ".";

  constructor() {
  }

  keyPress(event: any) {
      let inputChar = String.fromCharCode(event.charCode);

      let matcher = new RegExp(this.constraint, 'i')
      if (!matcher.test(inputChar)) {
        event.preventDefault();
      }
  }
}
