import { FormContext } from '../../shared.cxform/formContext';
import { IPartRepo, PartRepoFactory } from '../../data/partRepo';
import { IWorkRepo, WorkRepoFactory } from '../../data/workRepo';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-ticket-expenses-form',
  templateUrl: './ticket-expenses-form.component.html',
  styleUrls: ['./ticket-expenses-form.component.scss'],
  providers: [WorkRepoFactory, PartRepoFactory, FormContext]
})
export class TicketExpensesFormComponent {
  private workRepo: IWorkRepo;
  private partRepo: IPartRepo;

  public partRows: any[] = [];
  public workRows: any[] = [];

  public partStates: any[] = [
    { text: 'Saapunut', value: 2, color: 'green' },
    { text: 'Tilattu', value: 1, color: 'yellow' },
    { text: 'Tilaamatta', value: 0 },
  ];

  private currentTicket: string;

  @Input()
  set ticketId(value: string) {
      this.workRepo = this.workRepoFactory.Create(value);
      this.partRepo = this.partRepoFactory.Create(value);

      this.workRepo.Get()
        .subscribe(x => 
          this.workRows = x);

      this.partRepo.Get()
        .subscribe(x => 
          this.partRows = x);
  }

  public constructor(private workRepoFactory: WorkRepoFactory, private partRepoFactory: PartRepoFactory) {
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
      status: 0,
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
    let updatedWorkRows = this.workRows.filter(x => x.transient !== 'delete');
    let removedWorkRows = this.workRows.filter(x => x.transient === 'delete');
    this.workRepo.AddOrUpdate(updatedWorkRows);
    this.workRepo.Delete(removedWorkRows);

    let updatedPartRows = this.partRows.filter(x => x.transient !== 'delete');
    let removedPartRows = this.partRows.filter(x => x.transient === 'delete');
    this.partRepo.AddOrUpdate(updatedPartRows);
    this.partRepo.Delete(removedPartRows);
  }
}
