import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent implements OnInit {
  @Input() message!: string;
  @Input() sender!: string;
  @Input() isBot = false;

  constructor() {}

  ngOnInit() {}
}
