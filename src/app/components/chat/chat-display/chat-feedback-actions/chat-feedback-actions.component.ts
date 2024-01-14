import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-feedback-actions',
  templateUrl: './chat-feedback-actions.component.html'
})
export class ChatFeedbackActionsComponent {
  @Output() onFeedback = new EventEmitter<boolean>();
  @Output() onRefresh = new EventEmitter<void>();

  @Input() visibility!: boolean;

}
