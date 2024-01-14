import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './components/chat/chat.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatDisplayComponent } from './components/chat/chat-display/chat-display.component';
import { ChatFeedbackActionsComponent } from './components/chat/chat-display/chat-feedback-actions/chat-feedback-actions.component';
import { ChatMessageComponent } from './components/chat/chat-display/chat-message/chat-message.component';
import { ChatHeaderComponent } from './components/chat/chat-header/chat-header.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    ChatInputComponent,
    ChatDisplayComponent,
    ChatHeaderComponent,
    AppComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatMessageComponent,
    ChatDisplayComponent,
    ChatInputComponent,
    ChatFeedbackActionsComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
