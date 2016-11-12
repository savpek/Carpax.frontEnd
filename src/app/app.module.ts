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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TicketsComponent,
    TicketFilterComponent,
    DropdownComponent,
    EditComponent,
    FormTextInputComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: TicketsComponent},
      { path: 'edit/:id', component: EditComponent },
      { path: 'new', component: EditComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
