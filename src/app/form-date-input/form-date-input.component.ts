import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormContext, FormEntry } from '../service/formContext';
import * as moment from 'moment';

@Component({
  selector: 'cx-form-date-input',
  templateUrl: './form-date-input.component.html',
  styleUrls: ['./form-date-input.component.scss']
})
export class FormDateInputComponent {
    @Input()
    dateModel: Date;
    @Output()
    dateModelChange: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    label: string = 'NOT_SET';

    @Input()
    editAllowed: boolean = true;

    private showDatepicker: boolean = false;

    public entry: FormEntry;

    constructor(private form: FormContext) {
      this.entry = form.Join();
    }

    public toggleCalendar() {
        this.showDatepicker = true;
    }

    public hidePopup(event) {
        this.showDatepicker = false;
        let asUtc = moment(event).utc();
        this.dateModel = asUtc.toDate();
        this.dateModelChange.emit(asUtc.toISOString());
        this.entry.isDirty = true;
    }

    public formatCurrent() {
      if (this.dateModel) {
        return moment(this.dateModel).format('DD.MM.YYYY');
      }
      return '';
    }
}
