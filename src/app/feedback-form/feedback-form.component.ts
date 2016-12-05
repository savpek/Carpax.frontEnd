import { Component } from '@angular/core';
import { FeedbackRepo, IFeedback } from '../data/feedbackRepo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  providers: [FeedbackRepo]
})
export class FeedbackFormComponent {
  private feedback: IFeedback[] = [];
  private currentTicket: string;
  private newMessageText: string = "";

  constructor(private repo: FeedbackRepo, private activeRoute: ActivatedRoute) {
        activeRoute.parent.params.subscribe(params => {
          this.currentTicket = params['id'];
          repo.get(this.currentTicket).subscribe(x => this.feedback = x);
        });
  }

  public getLabel(feedback: IFeedback) {
    return `${feedback.created} ${feedback.whoIs}`;
  }

  public sendDisabled(): boolean {
    return !this.newMessageText;
  }

  public send() {
    this.repo.Add(this.currentTicket, {
      message: this.newMessageText
    });
  }
}
