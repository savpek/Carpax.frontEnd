import { Component, ViewContainerRef  } from '@angular/core';

import { Overlay } from 'angular2-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
    constructor(vcRef: ViewContainerRef, private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcRef);
  }
}

