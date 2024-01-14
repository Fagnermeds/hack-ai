import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatApiService } from 'src/app/api/chat.service';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatSessionService {
  private _messages$ = new BehaviorSubject<IMessage[]>([
    // {
    //   sender: 'Eu',
    //   message:
    //     'Estou a procura de um colaborador com FE skills que saiba Angular e possa começar o mais rápido possível',
    // },
    // {
    //   sender: 'eu',
    //   message:
    //     'Estou a procura de um colaborador com FE skills que saiba Angular e possa começar o mais rápido possível',
    // },
  ]);

  constructor(private chatApiService: ChatApiService) {}

  public messages$ = this._messages$.asObservable();

  public loading$ = new BehaviorSubject<boolean>(false);

  private addMessage(message: IMessage) {
    this._messages$.next([...this._messages$.value, message]);
  }

  public sendMessage(message: string) {
    this.loading$.next(true);

    this.addMessage({ sender: 'Eu', message, isBot: false });

    this.chatApiService.send(message).subscribe((response) => {
      this.addMessage({ sender: 'Bot', message: response.answer, isBot: true });
      this.loading$.next(false);
    });
  }

}
