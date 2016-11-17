import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface IFile {
    uri: string;
    name: string;
    originalName: string;
    added: Date;
}

@Injectable()
export class FileRepo {
    constructor(private http: Http) {}

    public Get(ticketId: string): Observable<IFile[]> {
        return this.http.get(`${environment.apiBase}/file/${ticketId}`)
            .map(response =>
                <IFile[]>response.json());
    }
}