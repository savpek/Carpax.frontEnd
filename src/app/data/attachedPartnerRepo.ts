import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataApiFactory, DataApi, IEntry } from './DataApi';

export interface IAttachedPartner extends IEntry {
    partnerId: string;
    description: string;
}

@Injectable()
export class AttachedPartnerRepo {
    private api: DataApi<IAttachedPartner>;

    constructor(apiFactory: DataApiFactory) {
        this.api = apiFactory.create<IAttachedPartner>();
    }

    public get(): Observable<IAttachedPartner[]> {
        return this.api.get(`attachedpartner/`);
    }

    public add(attachedPartner: IAttachedPartner) {
        this.api.post(`attachedpartner/`, attachedPartner);
    }

    public delete(attachedPartner: IAttachedPartner) {
    }
}
