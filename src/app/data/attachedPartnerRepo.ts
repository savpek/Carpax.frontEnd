import { RepoBase, IEntry } from './RepoBase';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IAttachedPartner extends IEntry {
    partnerId: string;
    description: string;
}

@Injectable()
export class AttachedPartnerRepo extends RepoBase<IAttachedPartner> {
    constructor(http: Http) {
        super(http);
    }

    public get(): Observable<IAttachedPartner[]> {
        return super.get(`attachedpartner/`);
    }

    public add(attachedPartner: IAttachedPartner) {
        super.post(`attachedpartner/`, attachedPartner);
    }

    public delete(attachedPartner: IAttachedPartner) {
    }
}
