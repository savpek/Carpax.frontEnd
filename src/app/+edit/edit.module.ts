import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { FilesFormComponent } from './files-form/files-form.component';
import { ExpensesFormComponent } from './expenses-form/expenses-form.component';
import { FeedbackComponent } from './feedback.component';
import { FileInputComponent } from './file-input/file-input.component';
import { FileThumbnailComponent } from './file-thumbnail/file-thumbnail.component';
import { ImageThumbnailComponent } from './image-thumbnail/image-thumbnail.component';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { CxComponentModule } from '../shared.cxcomponent/cxcomponent.module';

const routes: any = [
    {
        path: ':id',
        component: EditComponent,
        children: [
            { path: '', component: EditFormComponent },
            { path: 'files', component: FilesFormComponent },
            { path: 'feedback', component: FeedbackComponent },
            { path: 'expenses', component: ExpensesFormComponent }
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
        FileInputComponent,
        FileThumbnailComponent,
        ImageThumbnailComponent,
        EditComponent,
        EditFormComponent,
        FilesFormComponent,
        FeedbackComponent,
        ExpensesFormComponent
    ],
    exports: [
    ],
    providers: []
})
export class EditModule { }