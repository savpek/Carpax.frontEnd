import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Auth } from '../service/auth';

import { map } from 'rxjs/operators';

import Utils from './util';
import { HttpWrapper } from './httpWrapper';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ResourceFactory {
    constructor(private http: HttpWrapper, private auth: Auth) {}

    public createMany<T>(resource: string): Resources<T> {
        return new Resources<T>(resource, this.http, this.auth)
    }

    public create<T>(resource: string): Resource<T> {
        return new Resource<T>(resource, this.http, this.auth)
    }
}

export class Resources<T> {
    private subject: BehaviorSubject<T[]> = new BehaviorSubject([]);
    private current: T[] = [];
    private fetching: boolean;

    constructor(
        private resourcePath: string,
        private http: HttpWrapper,
        private auth: Auth) {}

    public get(): Observable<T[]> {
        if (!this.fetching) {
            this.fetching = true;
            this.http.get(`${environment.apiBase}/${this.resourcePath}`)
                .pipe(map(response => response.json()))
                .subscribe(result => {
                    Utils.unwrapResult<T>(result, data => {
                        this.current = data;
                        this.subject.next(this.current.slice());
                    }, error => this.subject.error(error));
                    this.fetching = false;
                });
        }

        return this.subject;
    }

    public post(body: any, idSelector: (x: T) => any): Observable<T[]> {
        let postSubject = new Subject<T[]>();

        this.http.post(`${environment.apiBase}/${this.resourcePath}`, body)
            .pipe(map(response => response.json()))
            .subscribe(result => {
                Utils.unwrapResult<T>(result, data => {
                    // Remove updated.
                    this.current = this.current.filter(c => !data.find(r => idSelector(r) === idSelector(c)));

                    data.forEach(x => this.current.push(x))

                    this.subject.next(this.current.slice());
                    postSubject.next(this.current.slice());
                },
                error => postSubject.error(error));
            }, error => postSubject.error(error));

        return postSubject;
    }

    public delete(target: T, idSelector: (x: T) => any): Observable<T[]> {
        let deleteSubject = new Subject<T[]>();

        this.http.delete(`${environment.apiBase}/${this.resourcePath}/${idSelector(target)}`)
            .subscribe(result => {
                this.current = this.current.filter(c => idSelector(c) !== idSelector(target));
                this.subject.next(this.current.slice());
                deleteSubject.next(this.current.slice());
            });

        return deleteSubject;
    }
}

export class Resource<T> {
    private subject: Subject<T> = new Subject();

    constructor(
        private resourcePath: string,
        private http: HttpWrapper,
        private auth: Auth) {}

    public get(): Observable<T> {
        this.http.get(`${environment.apiBase}/${this.resourcePath}`)
            .pipe(map(response => response.json()))
            .subscribe(result => {
                Utils.unwrapResult<T>(result, data => {
                    this.subject.next(data[0]);
                }, error => this.subject.error(error));
            });

        return this.subject;
    }

    public post(body: any): Observable<T> {
        let postSubject = new Subject<T>();

        this.http.post(`${environment.apiBase}/${this.resourcePath}`, body)
            .pipe(map(response => response.json()))
            .subscribe(result => {
                Utils.unwrapResult<T>(result, data => {
                    this.subject.next(data[0]);
                    postSubject.next(data[0]);
                },
                error => postSubject.error(error));
            });

        return postSubject;
    }

    public delete(): Observable<void> {
        let deleteSubject = new Subject<void>();

        this.http.delete(`${environment.apiBase}/${this.resourcePath}`)
            .pipe(map(response => response.json()))
            .subscribe(result => {
                this.subject.next();
                deleteSubject.next();
            }, error => deleteSubject.error(error));

        return deleteSubject;
    }
}
