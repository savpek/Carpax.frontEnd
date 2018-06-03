import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IResult } from '../data/iresult';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordReset {
    constructor(private http: Http) {}

    public requestDataForToken(token: string): Observable<IResult<any>> {
        return this.http.get(`${environment.apiBase}/password/${token}/`)
            .pipe(map(x => x.json()))
    }

    public resetPassword(token: string, newPassword: string): Observable<IResult<any>> {
        return this.http.put(`${environment.apiBase}/password/${token}/`, {
            newPassword: newPassword
        }).pipe(map(x => x.json()))
    }
}
