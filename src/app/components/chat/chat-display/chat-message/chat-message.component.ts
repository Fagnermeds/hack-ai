import { Component, Input } from '@angular/core';
import { Sender } from 'src/app/enum/sender';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent {
  @Input() message!: string;
  @Input() sender!: string;

  SenderEnum = Sender;

  async copyToClipboard(message: string) {
    navigator.clipboard.writeText(message);
  }
}
