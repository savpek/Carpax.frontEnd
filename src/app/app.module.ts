import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentComponent } from './content/content.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { DropdownComponent } from './dropdown/dropdown.component';

import { RouterModule }   from '@angular/router';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContentComponent,
    TicketsComponent,
    TicketFilterComponent,
    DropdownComponent,
    EditComponent
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
