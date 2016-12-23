import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { ControlPanelAttachedPartnersComponent } from './control-panel-attached-partners/control-panel-attached-partners.component';
import { ControlPanelComponent } from './control-panel.component';
import { ControlPanelPartnersComponent } from './control-panel-partners/control-panel-partners.component';
import { ControlPanelUsersComponent } from './control-panel-users/control-panel-users.component';
import { CxComponentModule } from '../shared.cxcomponent/cxcomponent.module';

const routes: any = [
    {
        path: '',
        component: ControlPanelComponent,
        children: [
          { path: '', component: ControlPanelUsersComponent },
          { path: 'users', component: ControlPanelUsersComponent },
          { path: 'partners', component: ControlPanelPartnersComponent },
          { path: 'attached', component: ControlPanelAttachedPartnersComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CxFormModule,
        CxComponentModule,
        RouterModule.forChild(routes)],
    declarations: [
        ControlPanelComponent,
        ControlPanelAttachedPartnersComponent,
        ControlPanelPartnersComponent,
        ControlPanelUsersComponent
    ],
    exports: [
    ],
    providers: []
})
export class ControlPanelModule {}