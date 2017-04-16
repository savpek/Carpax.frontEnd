import { Component, Input } from '@angular/core';
import { FeedbackRepo, IFeedback, FeedbackRepoFactory } from '../../data/feedbackRepo';
import * as moment from 'moment';

@Component({
  selector: 'cx-ticket-feedback-form',
  templateUrl: './ticket-feedback-form.component.html',
  styleUrls: ['./ticket-feedback-form.component.scss'],
  providers: [FeedbackRepoFactory]
})
export class TicketFeedbackFormComponent {
  public feedback: IFeedback[] = [];
  public newMessageText: string = '';

  private repo: FeedbackRepo;

  @Input()
  set ticketId(value: string) {
    this.repo = this.repoFactory.create(value);
    this.repo.get()
      .subscribe(x => this.feedback = x);
  }

  constructor(private repoFactory: FeedbackRepoFactory) { }

  public getLabel(feedback: IFeedback) {
    return `${this.formatMessageTimeStamp(feedback.created)} ${feedback.whoIs}`;
  }

  public sendDisabled(): boolean {
    return !this.newMessageText;
  }

  public send() {
    this.repo.Add({
      message: this.newMessageText
    })

    this.newMessageText = '';
  }

  private formatMessageTimeStamp(value: Date) {
    return moment(value).format('DD.MM.YYYY HH:mm');
  }
}
