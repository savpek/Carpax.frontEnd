import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { EditFormComponent } from './edit-form.component';

export class EditFormGuard implements CanDeactivate<EditFormComponent> {

    canDeactivate(
            component: EditFormComponent,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot) {
                console.log("lol");
            return true;
    }

}