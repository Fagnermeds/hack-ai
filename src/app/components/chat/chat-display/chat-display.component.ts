import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ChatSessionService } from 'src/app/services/chat-session.service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styles: [
    `
      :host {
        .messages {
          display: block;
          max-height: 70vh;
        }

        .scroll-container {
          scroll-behavior: smooth;
        }
      }
    `,
  ],
})
export class ChatDisplayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @Input() message!: string;

  subscription!: Subscription;

  constructor(public chatSession: ChatSessionService) {}

  ngAfterViewInit(): void {
    this.subscription = this.chatSession.scrollToBottom$.pipe(debounceTime(1200)).subscribe(() => this.scrollToBottom());
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public scrollToBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  public sendFeedback(feedback: boolean) {
    this.chatSession.sendFeedback(feedback);
  }

  public refreshQuestion() {
    this.chatSession.refreshQuestion();
  }
}
