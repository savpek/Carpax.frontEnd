import { Component, EventEmitter, Input, OnChanges, AfterViewInit, Output, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormEntry, FormContext } from '../formContext';

@Component({
  selector: 'cx-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.scss']
})
export class FormTextInputComponent implements OnChanges {
  @Input()
  public text: string = '';

  @Output() textChange = new EventEmitter();

  @Input() public validate;

  @Input() public label: string = 'DEFAULT LABEL';

  @Input() public disabled = false;

  @Input() format: string;

  public entry: FormEntry;

  constructor(private form: FormContext) {
    this.entry = form.Join();
  }

  private applyFormat(text: string): string {
    if(!text) {
      return text;
    }

    switch (this.format) {
      case 'uppercase':
        return text.toUpperCase();
      default:
        return text;
    }
  }

  public isDisabled(): boolean {
    return this.disabled || this.form.disabled;
  }

  public keyboardEvent() {
    this.entry.isDirty = true;
    this.text = this.applyFormat(this.text);
    this.validateData();

    this.textChange.emit(this.text);
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
    this.validateData();
  }
}
