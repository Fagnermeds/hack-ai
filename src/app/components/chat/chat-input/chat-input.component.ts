import { Component } from '@angular/core';
import { ChatSessionService } from 'src/app/services/chat-session.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
})
export class ChatInputComponent {
  message = '';

  constructor(private chatService: ChatSessionService) {}

  sendMessage() {
    if (!this.message) {
      return;
    }

    this.chatService.sendMessage(this.message);

    this.message = '';
  }
}
