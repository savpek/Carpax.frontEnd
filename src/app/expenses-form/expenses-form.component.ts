import { DropdownItem } from '../dropdown/dropdown.component';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent {
  public partRows: any[] = [];
  public workRows: any[] = [];

  public partStates: DropdownItem[] = [
    { text: 'Saapunut', value: 0, color: 'green' },
    { text: 'Tilattu', value: 1, color: 'yellow' },
    { text: 'Tilaamatta', value: 2 },
  ];

  public delete(item) {
    item.transient = 'delete';
  }

  public restore(item) {
    item.transient = undefined;
  }

  public addWorkRow() {
    this.workRows.push({
      description: '',
      amount: 0,
      price: 0,
      units: 0,
      transient: 'new'
    });
  }

  public addPartRow() {
    this.partRows.push({
      description: '',
      identifier: '',
      price: 0,
      amount: 0,
      discount: 0,
      transient: 'new'
    });
  }

  public calculateWorkCost(work: any): number {
    return (work.units * 0.01) * work.price;
  }

  public calculatePartCost(part: any): number {
    return part.price * part.amount * ((100 - part.discount) / 100);
  }

  public calculateTotal() {
    return this.workRows.reduce((a, b) => a + this.calculateWorkCost(b), 0) +
      this.partRows.reduce((a, b) => a + this.calculatePartCost(b), 0);
  }

  public save() {
  }
}
