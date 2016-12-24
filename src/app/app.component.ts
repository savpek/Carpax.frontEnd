import { Component, ViewContainerRef  } from '@angular/core';

import { Overlay } from 'angular2-modal';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
    constructor(overlay: Overlay, vcRef: ViewContainerRef, private slimLoadingBarService: SlimLoadingBarService) {
    overlay.defaultViewContainer = vcRef;
  }

      startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }

    completeLoading() {
        this.slimLoadingBarService.complete();
    }
}

