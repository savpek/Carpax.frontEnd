import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Resources, ResourceFactory } from './DataApi';

export interface IFeedback {
    message: string;
    created?: Date;
    whoIs?: string;
}

@Injectable()
export class FeedbackRepoFactory {
    constructor(private apiFactory: ResourceFactory) {
    }

    public create(ticketId: string): FeedbackRepo {
        return new FeedbackRepo(this.apiFactory.createMany<IFeedback>(`feedbackmessages/${ticketId}`))
    }
}

export class FeedbackRepo {
    constructor(private resource: Resources<IFeedback>){}

    public get(): Observable<IFeedback[]> {
        return this.resource.get();
    }

    public Add(feedback: IFeedback) {
        this.resource.post(feedback, x => x.created + x.whoIs);
    }
}