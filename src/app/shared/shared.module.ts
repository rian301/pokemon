import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationAlertComponent } from './components/confirmation/confirmation-alert.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ConfirmationAlertComponent
  ],
  exports: [
    ConfirmationAlertComponent,
    FormsModule
  ]
})
export class SharedModule { }
