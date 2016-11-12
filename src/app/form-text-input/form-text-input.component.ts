import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cx-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.scss']
})
export class FormTextInputComponent implements OnInit {
  @Input() public text: string = '';
  @Output() textChange = new EventEmitter<number>();

  @Input() public validate: '.*';
  @Input() public label: string = 'DEFAULT LABEL';

  constructor() { }

  ngOnInit() {
  }

  public isDataInvalid() {
    return !this.text.match(this.validate);
  }
}
