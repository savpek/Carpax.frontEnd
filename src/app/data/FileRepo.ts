import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject} from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class FileRepo {
    private subject: Subject<FileEntry[]> = new Subject<FileEntry[]>();
    private data: FileEntry[] = [];

    constructor(private http: Http) {}

    public Get(ticketId: string): Observable<FileEntry[]> {
        this.http.get(`${environment.apiBase}/file/${ticketId}`)
            .subscribe(response => {
                this.data = <FileEntry[]>response.json();
                this.subject.next(this.data);
            });

        return this.subject;
    }

    public upload(ticketId: string, data: any): Observable<FileEntry> {
        return this.http.post(`${environment.apiBase}/file/${ticketId}`, data)
            .map(response => <FileEntry>response.json())
            .do(entry => {
                this.data.push(entry);
                this.subject.next(this.data);
            });
    }

    public delete(file: FileEntry): void {
        this.http.delete(`${environment.apiBase}/file/${file.id}`)
            .subscribe(response => {
                this.data = this.data.filter(f => f.uri !== file.uri);
                this.subject.next(this.data);
            });
    }
}

export class FileEntry {
    id: string;
    uri: string;
    name: string;
    originalName: string;
    added: Date;
    extension: string;
}