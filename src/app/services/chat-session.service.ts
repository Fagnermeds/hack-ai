import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, delay, timer } from 'rxjs';
import { ChatApiService } from '../api/chat-api.service';
import { Sender } from '../enum/sender';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatSessionService {
  private _messages$ = new BehaviorSubject<IMessage[]>([{
    sender: Sender.Bot,
    message: 'Hi! I am a bot. How can I help you?',
  }]);
  public messages$ = this._messages$.asObservable();
  public loading$ = new BehaviorSubject<boolean>(false);
  public dialogActions$ = new BehaviorSubject<boolean>(false);
  public scrollToBottom$ = new Subject<void>();

  constructor(private chatApiService: ChatApiService) {}

  private addMessage(message: IMessage) {
    this._messages$.next([...this._messages$.value, message]);
  }

  public sendMessage(message: string) {
    this.hideActions();
    this.showLoading();

    this.addMessage({ sender: Sender.User, message });

    this.chatApiService.send(message).subscribe({
      next: (response) => {
        this.addMessage({ sender: Sender.Bot, message: response });
        timer(1000).subscribe(() => {
          this.showActions();
        });
      },
      error: (err) => {
        this.addMessage({ sender: Sender.Bot, message: err.message });
      },
      complete: () => {
        this.hideLoading();
        this.scrollToBottom();
      },
    });
  }

  public sendFeedback(feedback: boolean) {
    // TODO: send feedback to the API
  }

  public refreshQuestion() {
    const lastQuestion = this._messages$.value[this._messages$.value.length - 1];

    this.sendMessage(lastQuestion.message);
  }

  showActions() {
    this.dialogActions$.next(true);
  }

  hideActions() {
    this.dialogActions$.next(false);
  }

  showLoading() {
    this.loading$.next(true);
  }

  hideLoading() {
    this.loading$.next(false);
  }

  scrollToBottom() {
    this.scrollToBottom$.next();
  }


}

