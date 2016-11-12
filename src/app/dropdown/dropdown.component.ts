import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() public items: any[];
  @Input() public header: string;
  @Input() public headerIcon: string;

  @Output() public onSelect = new EventEmitter();

  constructor() {}
  ngOnInit() {}

  public click(item: any) {
    this.onSelect.emit({
      newSelection: item
    });
  }
}
