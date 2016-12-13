import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CxFormModule } from '../shared.cxform/cxform.module';
import { TicketFieldsComponent } from './ticket-fields/ticket-fields.component';
import { TabsComponent, ITabRoute } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFeedbackFormComponent } from './ticket-feedback-form/ticket-feedback-form.component';
import { TicketExpensesFormComponent } from './ticket-expenses-form/ticket-expenses-form.component';
import { TicketFilesFormComponent } from './ticket-files-form/ticket-files-form.component';
import { FileInputComponent } from './ticket-files-form/file-input/file-input.component';
import { ImageThumbnailComponent } from './ticket-files-form/image-thumbnail/image-thumbnail.component';
import { FileThumbnailComponent } from './ticket-files-form/file-thumbnail/file-thumbnail.component';
import { NotificationRepo } from '../data/notificationRepo';

@NgModule({
  imports: [CommonModule, CxFormModule, RouterModule],
  declarations: [
      TicketFieldsComponent,
      TabsComponent,
      TicketListComponent,
      TicketFeedbackFormComponent,
      TicketExpensesFormComponent,
      TicketFilesFormComponent,
      FileInputComponent,
      ImageThumbnailComponent,
      FileThumbnailComponent
  ],
  exports: [
      TicketFieldsComponent,
      TabsComponent,
      TicketListComponent,
      TicketFeedbackFormComponent,
      TicketExpensesFormComponent,
      TicketFilesFormComponent
  ],
  providers: []
})
export class CxComponentModule {}
export { ITabRoute }