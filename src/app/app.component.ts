import { Component, ViewContainerRef  } from '@angular/core';

import { Overlay } from 'angular2-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
    constructor(overlay: Overlay, vcRef: ViewContainerRef, private toastr: ToastsManager) {
    overlay.defaultViewContainer = vcRef;
    this.toastr.setRootViewContainerRef(vcRef);
  }
}

