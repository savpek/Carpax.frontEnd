import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class LoadingBar {
    private operationCounter = 0;

    constructor(private slimBar: SlimLoadingBarService) {}

    public operationStarted() {
        this.operationCounter++;
        this.slimBar.start();
    }

    public operationStopped() {
        this.operationCounter--;

        if (this.operationCounter < 0) {
            this.operationCounter = 0;
        }

        if (this.operationCounter <= 0) {
            this.slimBar.complete();
        }
    }
}