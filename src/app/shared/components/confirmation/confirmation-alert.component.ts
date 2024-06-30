import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.css']
})
export class ConfirmationAlertComponent {

  @Input() isAction: boolean = true;
  @Input() title: string;
  @Input() message: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  confirmAction() {
    this.confirm.emit();
  }

  cancelAction() {
    this.cancel.emit();
  }
}
