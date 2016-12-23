import { Component, Input } from '@angular/core';
import { FeedbackRepo, IFeedback } from '../../data/feedbackRepo';
import * as moment from 'moment';

@Component({
  selector: 'cx-ticket-feedback-form',
  templateUrl: './ticket-feedback-form.component.html',
  styleUrls: ['./ticket-feedback-form.component.scss'],
  providers: [FeedbackRepo]
})
export class TicketFeedbackFormComponent {
  private feedback: IFeedback[] = [];
  private currentTicket: string;

  @Input()
  set ticketId(value: string) {
    this.currentTicket = value;
    this.repo.get(this.currentTicket)
      .subscribe(x => this.feedback = x);
  }

  private newMessageText: string = '';

  constructor(private repo: FeedbackRepo) { }

  public getLabel(feedback: IFeedback) {
    return `${this.formatMessageTimeStamp(feedback.created)} ${feedback.whoIs}`;
  }

  public sendDisabled(): boolean {
    return !this.newMessageText;
  }

  public send() {
    this.repo.Add(this.currentTicket, {
      message: this.newMessageText
    });
  }

  private formatMessageTimeStamp(value: Date) {
    return moment(value).format('DD.MM.YYYY HH:mm');
  }
}
