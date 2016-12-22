import { ICanDeactive } from '../service/cxCanDeactivate';
import { FormContext } from './formContext';
import { CxModal } from '../service/modal';
import { Observable } from 'rxjs';

export abstract class CanDeactivateForm implements ICanDeactive {
    constructor(private formContext: FormContext, private modal: CxModal) {}

    public canDeactivate() {
        if (this.formContext.isDirty()) {
            return new Promise((resolve) => this.modal.show.confirm()
                .message('Sinulla on tallentamattomia muutoksia, oletko varma että haluat jatkaa?')
                .okBtn('Jatka')
                .cancelBtn('Palaa')
                .title('Tallentamattomia muutoksia!')
                .open()
                    .then(x => x.result)
                    .then(success => resolve(true), rejected => resolve(false)));
        }
        return Promise.resolve(true);
    }
}