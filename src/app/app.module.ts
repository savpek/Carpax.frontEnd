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
    ImageThumbnailComponent
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
          { path: 'files', component: FilesFormComponent }
        ]
      },
      { path: 'new', component: EditComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
