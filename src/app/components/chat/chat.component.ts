import { Component, OnInit } from '@angular/core';
import { ChatSessionService } from './../../services/chat-session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatSessionService) {}

  ngOnInit() {}
}
