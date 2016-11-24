import { IWorkRepo, WorkRepoFactory } from '../data/workRepo';
import { DropdownItem } from '../dropdown/dropdown.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
  providers: [WorkRepoFactory]
})
export class ExpensesFormComponent {
  private workRepo: IWorkRepo;

  public partRows: any[] = [];
  public workRows: any[] = [];

  public partStates: DropdownItem[] = [
    { text: 'Saapunut', value: 0, color: 'green' },
    { text: 'Tilattu', value: 1, color: 'yellow' },
    { text: 'Tilaamatta', value: 2 },
  ];

  public constructor(workRepoFactory: WorkRepoFactory, activeRoute: ActivatedRoute) {
    activeRoute.parent.params.subscribe(params =>
        this.workRepo = workRepoFactory.Create(params['id']));
        this.workRepo.Get()
          .subscribe(x =>
            this.workRows = x);
  }

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
    let updatedRows = this.workRows.filter(x => x.transient !== 'delete');
    let removedRows = this.workRows.filter(x => x.transient === 'delete');
    this.workRepo.AddOrUpdate(updatedRows);
    this.workRepo.Delete(removedRows);
  }
}
