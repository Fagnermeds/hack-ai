import { Component, Input } from '@angular/core';
import { ChatApiService } from 'src/app/api/chat.service';
import { ChatSessionService } from 'src/app/services/chat-session.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
})
export class ChatInputComponent {
  message = '';

  constructor(
    private chatService: ChatSessionService,
    private chatApiService: ChatApiService
  ) {}

  sendMessage() {
    this.chatService.sendMessage(this.message);

    this.message = '';
  }
}
