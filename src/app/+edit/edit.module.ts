import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { FilesComponent } from './files.component';
import { FeedbackComponent } from './feedback.component';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { CxComponentModule } from '../shared.cxcomponent/cxcomponent.module';
import { ExpensesComponent } from './expenses.component';

const routes: any = [
    {
        path: ':id',
        component: EditComponent,
        children: [
            { path: '', component: EditFormComponent },
            { path: 'files', component: FilesComponent },
            { path: 'feedback', component: FeedbackComponent },
            { path: 'expenses', component: ExpensesComponent }
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
        EditComponent,
        EditFormComponent,
        FilesComponent,
        FeedbackComponent,
        ExpensesComponent
    ],
    exports: [
    ],
    providers: []
})
export class EditModule { }