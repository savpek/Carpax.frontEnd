import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject} from 'rxjs';

import { environment } from '../../environments/environment';
import { Auth } from 'app/service/auth';

@Injectable()
export class FileRepo {
    private subject: Subject<FileEntry[]> = new Subject<FileEntry[]>();
    private data: FileEntry[] = [];

    constructor(private http: Http, private auth: Auth) {}

    private getHeader(): any {
        return new Headers({ 'Authorization': 'Bearer ' + this.auth.getAccessToken() });
    }

    public Get(ticketId: string): Observable<FileEntry[]> {
        this.http.get(`${environment.apiBase}/file/${ticketId}`, { headers: this.getHeader() })
            .subscribe(response => {
                this.data = <FileEntry[]>response.json();
                this.subject.next(this.data);
            });

        return this.subject;
    }

    public upload(ticketId: string, data: any): Observable<FileEntry> {
        return this.http.post(`${environment.apiBase}/file/${ticketId}`, data, { headers: this.getHeader() })
            .map(response => <FileEntry>response.json())
            .do(entry => {
                this.data.push(entry);
                this.subject.next(this.data);
            });
    }

    public delete(file: FileEntry): void {
        this.http.delete(`${environment.apiBase}/file/${file.id}`, { headers: this.getHeader() })
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