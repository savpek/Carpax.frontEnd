import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {
  public workRows: any[] = [{
    description: 'dummyDesc',
    amount: 1,
    price: 5,
    units: 5
  }];

  constructor() { }

  ngOnInit() {
  }

  public calculateWorkCost(work: any): number {
    return work.units * work.price;
  }
}
