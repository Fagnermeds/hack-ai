import { Component, Input } from '@angular/core';
import { ChatSessionService } from 'src/app/services/chat-session.service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
})
export class ChatDisplayComponent {
  constructor(public chatSession: ChatSessionService) {}

  @Input() message!: string;
}
