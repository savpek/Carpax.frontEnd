import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cx-form-text-area-input',
  templateUrl: './form-text-area-input.component.html',
  styleUrls: ['./form-text-area-input.component.scss']
})
export class FormTextAreaInputComponent {
  @Input() public text: string = '';
  @Output() textChange = new EventEmitter();

  @Input() public validate;
  @Input() public label: string = 'DEFAULT LABEL';

  @Input() public disabled = false;

  constructor() {}

  public rows(): number {
    let currentCount = this.text.split(/\r\n|\r|\n/).length;

    if(currentCount <= 5) {
      return 5;
    }

    return currentCount + 1;
  }

  public keyboardEvent() {
    this.textChange.emit(this.text);
  }
}
