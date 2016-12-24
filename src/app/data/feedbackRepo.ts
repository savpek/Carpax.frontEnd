import { RepoBase } from './RepoBase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { DataApi, DataApiFactory } from './DataApi';

export interface IFeedback {
    message: string;
    created?: Date;
    whoIs?: string;
}

@Injectable()
export class FeedbackRepo {
    private api: DataApi<IFeedback>;

    constructor(apiFactory: DataApiFactory) {
        this.api = apiFactory.create<IFeedback>();
    }

    public get(ticketId: string): Observable<IFeedback[]> {
        return this.api.get(`feedbackmessages/${ticketId}`);
    }

    public Add(ticketId: string, feedback: IFeedback) {
        this.api.post(`feedbackmessages/${ticketId}`, feedback);
    }
}