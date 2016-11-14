import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() public items: DropdownItem[];
  @Input() public header: string;
  @Input() public headerIcon: string;

  @Input() public value: any;
  @Output() public valueChange = new EventEmitter();

  public getHeaderText() {
    let current = '';

    if (this.value !== undefined) {
      current = this.items
        .filter(x => x.value === this.value)
        .map(x => x.text)[0];
    }

    if (this.header) {
      return `${this.header}: ${current}`;
    }
    return current;
  }

  public dropdownClick(item: any) {
    this.value = item.value;
    this.valueChange.emit(this.value);
  }
}
export class DropdownItem {
  constructor(public text: string, public value: any) {}
}