import { Component, EventEmitter, Output } from '@angular/core';
import { ChatSessionService } from 'src/app/services/chat-session.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
})
export class ChatInputComponent {
  @Output() onSendQuestion = new EventEmitter<void>();
  message = '';

  constructor(public chatService: ChatSessionService) {}

  sendMessage() {
    if (!this.message) {
      return;
    }

    this.chatService.sendMessage(this.message);

    this.message = '';
  }
}
