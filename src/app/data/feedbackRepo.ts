import { RepoBase } from './RepoBase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IFeedback {
}

@Injectable()
export class FeedbackRepo extends RepoBase<IFeedback> {
    constructor(http: Http) {
        super(http);
    }

    public Get(ticketId: string): Observable<IFeedback[]> {
        return super.Get(`feedbackmessages/${ticketId}`);
    }

    public Add(feedback: IFeedback) {
    }
}