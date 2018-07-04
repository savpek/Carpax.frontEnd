const schema = {
    'version': 'v1',
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
                    'name': 'customer',
                    'label': 'Asiakas',
                    'type': 'text'
                }
            ]
        }
    ]
};

import { Observable } from 'rxjs';
export class TicketSchema {
    public get(): Observable<string> {
        return Observable.create(x => {
            x.next(schema)
        });
    }
}


