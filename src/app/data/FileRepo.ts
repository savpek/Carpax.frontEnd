import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject} from 'rxjs';

import { environment } from '../../environments/environment';

export interface IFile {
    id: string;
    uri: string;
    name: string;
    originalName: string;
    added: Date;
}

@Injectable()
export class FileRepo {
    private subject: Subject<IFile[]> = new Subject<IFile[]>();
    private data: IFile[] = [];

    constructor(private http: Http) {}

    public Get(ticketId: string): Observable<IFile[]> {
        this.http.get(`${environment.apiBase}/file/${ticketId}`)
            .subscribe(response => {
                this.data = <IFile[]>response.json();
                this.subject.next(this.data);
            });

        return this.subject;
    }

    public delete(file: IFile): void {
        this.http.delete(`${environment.apiBase}/file/${file.id}`)
            .subscribe(x => {
                this.data = this.data.filter(x => x.uri !== file.uri);
                this.subject.next(this.data);
            });
    }
}