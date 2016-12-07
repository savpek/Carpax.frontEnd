import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'cx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public disabled: boolean = false;

  @Input()
  public icon: string;

  @Input()
  public text: string = '';

  @Output()
  public action = new EventEmitter();

  public buttonPress() {
    this.action.emit();
  }
}
