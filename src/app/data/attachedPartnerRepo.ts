import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntry, ResourceFactory, Resources } from './resource';
import { map } from 'rxjs/operators';

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

    public add(attachedPartner: IAttachedPartner): Observable<void> {
        return this.resource.post(attachedPartner, x => x.partnerId)
            .pipe(map(x => {}));
    }

    public delete(attachedPartner: IAttachedPartner) {
        this.resource.delete(attachedPartner, x => x.partnerId);
    }
}
