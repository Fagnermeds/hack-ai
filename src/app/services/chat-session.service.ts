import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatApiService } from '../api/chat-api.service';
import { Sender } from '../enum/sender';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatSessionService {
  private _messages$ = new BehaviorSubject<IMessage[]>([]);
  public messages$ = this._messages$.asObservable();
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private chatApiService: ChatApiService) {}

  private addMessage(message: IMessage) {
    this._messages$.next([...this._messages$.value, message]);
  }

  public sendMessage(message: string) {
    this.loading$.next(true);

    this.addMessage({ sender: Sender.User, message });

    this.chatApiService.send(message).subscribe((response) => {
      this.addMessage({ sender: Sender.Bot, message: response.answer });
      this.loading$.next(false);
    });
  }
}

