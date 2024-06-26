import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserChatService } from '@services/user';
import { BehaviorSubject, Subscription } from 'rxjs';

const MAX_MESSAGES = 50;

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserChatComponent {
  chatSubscription: Subscription | null = null;
  readonly messages = new BehaviorSubject<string[]>([]);
  constructor(
    private readonly userChatService: UserChatService
  ) {}

  get isChatting() {
    return this.chatSubscription !== null;
  }

  startChat() {
    this.chatSubscription = this.userChatService._messagesSubject.subscribe((data) => {
      const message = `${data.username}: ${data.message}`;
      this.messages.next([...this.messages.value, message]);
      if (this.messages.value.length > MAX_MESSAGES) {
        this.messages.value.shift();
      }
    });
    this.userChatService.startChat();
  }

  stopChat() {
    this.userChatService.stopChat().then(() => {
      this.chatSubscription?.unsubscribe();
      this.chatSubscription = null;
    });
  }
}
