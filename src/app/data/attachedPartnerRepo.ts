import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataApiFactory, DataApi, IEntry, ResourceFactory, Resources } from './DataApi';

export interface IAttachedPartner extends IEntry {
    partnerId: string;
    description: string;
}

@Injectable()
export class AttachedPartnerRepo {
    private resource: Resources<IAttachedPartner>;

    constructor(resourceFactory: ResourceFactory) {
        this.resource = resourceFactory.createMany<IAttachedPartner>(`attachedpartner`);
    }

    public get(): Observable<IAttachedPartner[]> {
        return this.resource.get();
    }

    public add(attachedPartner: IAttachedPartner) {
        this.resource.post(attachedPartner, x => x.partnerId);
    }

    public delete(attachedPartner: IAttachedPartner) {
        this.resource.delete(attachedPartner, x => x.partnerId);
    }
}
