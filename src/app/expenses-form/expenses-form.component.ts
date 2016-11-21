import { DropdownItem } from '../dropdown/dropdown.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {
  public partRows: any[] = [{
    description: 'PartName',
    identifier: 'PartIdentifier',
    price: 5,
    amount: 2,
    discount: 10
  }];

  public workRows: any[] = [{
    description: 'dummyDesc',
    amount: 1,
    price: 5,
    units: 5
  }];

  public partStates: DropdownItem[] = [
    { text: 'Saapunut', value: 0, color: 'green' },
    { text: 'Tilattu', value: 1, color: 'yellow' },
    { text: 'Tilaamatta', value: 2 },
  ];

  constructor() { }

  ngOnInit() {
  }

  public deletePart() {

  }

  public calculateWorkCost(work: any): number {
    return (work.units * 0.01) * work.price;
  }

  public deleteWork() {
  }

  public calculatePartCost(part: any): number {
    return part.price * part.amount * ((100 - part.discount) / 100);
  }

  public calculateTotal() {
    return 0;
  }
}
