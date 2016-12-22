import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

export interface ICanDeactive {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CxCanDeactivate implements CanDeactivate<ICanDeactive> {
    canDeactivate(
            component: ICanDeactive,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot) {

        return component.canDeactivate();
    }
}
