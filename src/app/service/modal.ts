import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class CxModal {
    constructor(public show: Modal) {}
}
