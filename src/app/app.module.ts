import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { DropdownComponent } from './dropdown/dropdown.component';

import { RouterModule }   from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { FormTextInputComponent } from './form-text-input/form-text-input.component';
import { ButtonComponent } from './button/button.component';
import { FormDropdownInputComponent } from './form-dropdown-input/form-dropdown-input.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { FilesFormComponent } from './files-form/files-form.component';
import { FormDateInputComponent } from './form-date-input/form-date-input.component';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ImageThumbnailComponent } from './image-thumbnail/image-thumbnail.component';
import { FileThumbnailComponent } from './file-thumbnail/file-thumbnail.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ExpensesFormComponent } from './expenses-form/expenses-form.component';
import { FormTextInputSmallComponent } from './form-text-input-small/form-text-input-small.component';
import { TooltipDirective } from './tooltip.directive';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlPanelUsersComponent } from './control-panel-users/control-panel-users.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TicketsComponent,
    TicketFilterComponent,
    DropdownComponent,
    EditComponent,
    FormTextInputComponent,
    ButtonComponent,
    FormDropdownInputComponent,
    EditFormComponent,
    FilesFormComponent,
    FormDateInputComponent,
    ImageThumbnailComponent,
    FileThumbnailComponent,
    FileInputComponent,
    ExpensesFormComponent,
    FormTextInputSmallComponent,
    TooltipDirective,
    ControlPanelComponent,
    ControlPanelUsersComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule,
    RouterModule.forRoot([
      { path: '', component: TicketsComponent},
      {
        path: 'edit/:id',
        component: EditComponent,
        children: [
          { path: '', component: EditFormComponent },
          { path: 'files', component: FilesFormComponent },
          { path: 'expenses', component: ExpensesFormComponent }
        ]
      },
      { path: 'new', component: EditComponent },
      {
        path: 'controlpanel',
        component: ControlPanelComponent,
        children: [
          { path: '', component: ControlPanelUsersComponent },
          { path: 'partners', component: ControlPanelUsersComponent },
        ]
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
