const schema = {
    'version': 'v1',
    'ticketList': [
        {
            'name': 'registerPlate',
            'label': 'Rekisterinumero',
            'hideOnMobile': 'true'
        },
        {
            'name': 'customer',
            'label': 'Asiakas',
        },
    ],
    'calendar': {
        'enabled': true,
        'titleField': 'registerPlate',
        'startDateSelector': 'workStartDate',
        'endDateSelector': 'workEndDate'
    },
    'basicForm': [
        {
            'groupName': 'Auton tiedot',
            items: [
                {
                    'name': 'registerPlate',
                    'label': 'Rekisterinumero*',
                    'type': 'text',
                    'validator': '.+',
                    'format': 'uppercase',
                },
                {
                    'name': 'vin',
                    'label': 'VIN',
                    'type': 'text',
                    'format': 'uppercase'
                },
                {
                    'name': 'brand',
                    'label': 'Merkki',
                    'type': 'text'
                },
                {
                    'name': 'model',
                    'label': 'Malli',
                    'type': 'text'
                },
                {
                    'name': 'colorCode',
                    'label': 'Värikoodi',
                    'type': 'text'
                },
                {
                    'name': 'kilometersDriven',
                    'label': 'Ajetut kilometrit',
                    'type': 'text'
                }
            ]
        },
        {
            'groupName': 'Asiakastiedot',
            items: [
                {
                    'name': 'customer',
                    'label': 'Asiakas',
                    'type': 'text'
                },
                {
                    'name': 'phone',
                    'label': 'Puhelin',
                    'type': 'text'
                },
                {
                    'name': 'email',
                    'label': 'Sähköposti',
                    'type': 'text'
                },
                {
                    'name': 'address',
                    'label': 'Lähiosoite',
                    'type': 'text'
                },
                {
                    'name': 'postNumber',
                    'label': 'Postinumero',
                    'type': 'text'
                },
                {
                    'name': 'city',
                    'label': 'Kaupunki',
                    'type': 'text'
                }
            ]
        },
        {
            'groupName': 'Vahinkotiedot',
            items: [
                {
                    'name': 'insurance',
                    'label': 'Vakuutus',
                    'type': 'dropdown',
                    'options': [
                        { text: 'Liikenne', value: 0 },
                        { text: 'Kasko', value: 1 },
                        { text: 'Vastuuvakuutus', value: 2 },
                        { text: 'Asiakas maksaa', value: 3 }
                    ]
                },
                {
                    'name': 'otherSideRegisterPlate',
                    'label': 'Vastapuolen rekisterinumero',
                    'type': 'text',
                    'showWhen': { 'name': 'insurance', 'equals': '0' }
                },
                {
                    'name': 'otherSideInsurance',
                    'label': 'Vastapuolen vakuutus',
                    'type': 'text',
                    'showWhen': { 'name': 'insurance', 'equals': '0' }
                },
                {
                    'name': 'accidentType',
                    'label': 'Vahinkolaji',
                    'type': 'dropdown',
                    'showWhen': { 'name': 'insurance', 'equals': '1' },
                    'options': [
                        { text: 'Törmäys', value: 0 },
                        { text: 'Ilkivalta', value: 1 },
                        { text: 'Parkkipaikka', value: 2 },
                        { text: 'Varkaus', value: 3 },
                        { text: 'Palo', value: 4 },
                        { text: 'Lasivakuutus', value: 5 }
                    ]
                },
                {
                    'name': 'accidentNumber',
                    'label': 'Vahinkonumero',
                    'type': 'text',
                    'showWhen': { 'name': 'insurance', 'notEquals': '3' }
                },
                {
                    'name': 'insuranceCompany',
                    'label': 'Vakuutusyhtiö',
                    'type': 'text',
                    'showWhen': { 'name': 'insurance', 'notEquals': '3' }
                },
                {
                    'name': 'excess',
                    'label': 'Omavastuu',
                    'type': 'text',
                    'showWhen': { 'name': 'insurance', 'notEquals': '3' }
                },
                {
                    'name': 'description',
                    'label': 'Selite',
                    'type': 'textArea'
                },
                {
                    'name': 'when',
                    'label': 'Tapahtuma-aika',
                    'type': 'date'
                },
                {
                    'name': 'workStartDate',
                    'label': 'Aloituspäivä',
                    'type': 'date'
                },
                {
                    'name': 'workEndDate',
                    'label': 'Valmistumispäivä',
                    'type': 'date'
                }
            ]
        }
    ]
};

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Auth } from 'app/service/auth';
import { flatMap, map } from 'rxjs/operators';
import { ResourceFactory } from '../data/resource';

@Injectable()
export class TicketSchema {
    private currentSchema: ReplaySubject<any> = new ReplaySubject(1);

    constructor(auth: Auth, resourceFactory: ResourceFactory) {
        auth.getCurrentUser()
        .pipe(flatMap(user =>
            resourceFactory.create<any>(`customer/${user.customerId}`).get()
        )).subscribe(x => this.currentSchema.next(x.schema))
    }

    public get(): Observable<any> {
        return this.currentSchema;
    }
}


