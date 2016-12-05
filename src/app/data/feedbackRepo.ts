import { RepoBase } from './RepoBase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IFeedback {
    message: string;
    created?: Date;
    whoIs?: string;
}

@Injectable()
export class FeedbackRepo extends RepoBase<IFeedback> {
    constructor(http: Http) {
        super(http);
    }

    public get(ticketId: string): Observable<IFeedback[]> {
        return super.get(`feedbackmessages/${ticketId}`);
    }

    public Add(ticketId: string, feedback: IFeedback) {
        super.post(`feedbackmessages/${ticketId}`, feedback);
    }
}