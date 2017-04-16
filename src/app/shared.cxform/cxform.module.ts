import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { IDropdownItem } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';
import { FormEntry, FormContext } from './formContext';
import { FormDateInputComponent } from './form-date-input/form-date-input.component';
import { FormDropdownInputComponent } from './form-dropdown-input/form-dropdown-input.component';
import { FormTextInputComponent } from './form-text-input/form-text-input.component';
import { FormTextInputSmallComponent } from './form-text-input-small/form-text-input-small.component';
import { FormTextAreaInputComponent } from './form-text-area-input/form-text-area-input.component';
import { DatepickerModule } from 'ng2-bootstrap';

@NgModule({
  imports: [CommonModule, FormsModule, DatepickerModule],
  declarations: [
    DropdownComponent,
    ButtonComponent,
    FormDateInputComponent,
    FormDropdownInputComponent,
    FormTextInputComponent,
    FormTextInputSmallComponent,
    FormTextAreaInputComponent],
  exports: [
    DropdownComponent,
    ButtonComponent,
    FormDateInputComponent,
    FormDropdownInputComponent,
    FormTextInputComponent,
    FormTextInputSmallComponent,
    FormTextAreaInputComponent],
  providers: []
})
export class CxFormModule { }

export { IDropdownItem, FormEntry, FormContext };
