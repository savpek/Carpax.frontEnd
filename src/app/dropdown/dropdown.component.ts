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

  @Input() public theme: string = 'dark';

  @Input() public value: any;
  @Output() public valueChange = new EventEmitter();

  @Input() public dirty: boolean;

  private getCurrent(): DropdownItem {
    if (this.value !== undefined) {
      return this.items
        .filter(x => x.value === this.value)[0];
    }
    return undefined;
  }

  public getHeaderText() {
    let current = this.getCurrent() || { text: ''};

    if (this.header) {
      return `${this.header}: ${current.text}`;
    }
    return current.text;
  }

  public dropdownClick(item: any) {
    this.value = item.value;
    this.valueChange.emit(this.value);
  }

  public getColor() {
    let current = this.getCurrent();

    if (!current || !current.color) {
      return 'default';
    }
    return current.color;
  }
}

export class DropdownItem {
  public color?: string;
  public text: string;
  public value: any;
}