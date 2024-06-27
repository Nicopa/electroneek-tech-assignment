import { Injectable } from "@angular/core";
import { LoggerService } from "@services/logger";
import { WebsocketService } from "@services/websocket/websocket.service";
import { UserMessageInterface, UserWsSocketMessageName } from '@shared/user';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserChatService {
    readonly _messagesSubject = new Subject<UserMessageInterface>();
    constructor(
        private readonly websocketService: WebsocketService,
        private readonly loggerService: LoggerService
    ) {}

    async startChat() {
        this.loggerService.log(`Starting chat`);
        this.websocketService.on(UserWsSocketMessageName.ChatMessage, (data: UserMessageInterface) => {
            this.loggerService.log(`Message received from ${data.username}`);
            this._messagesSubject.next(data);
        });
        await this.websocketService.connect();
        this.loggerService.log(`Connected to websocket`);
        const result = await this.websocketService.emitAndWaitResponse(UserWsSocketMessageName.StartChat);
        if (result === 'Started') {
            this.loggerService.log(`Chat started`);
        } else {
            console.log(result);
            this.loggerService.log(`Failed to start chat!`);
        }
    }

    async stopChat() {
        this.loggerService.log(`[${UserChatService.name}] stopping chat`);
        const result = await this.websocketService.emitAndWaitResponse(UserWsSocketMessageName.StopChat);
        if (result === 'Stopped') {
            this.loggerService.log(`[${UserChatService.name}] chat stopped`);
            this.websocketService.off(UserWsSocketMessageName.ChatMessage);
            this.websocketService.disconnect();
            this.loggerService.log(`[${UserChatService.name}] disconnected from websocket`);
        } else {
            console.log(result);
            this.loggerService.log(`[${UserChatService.name}] failed to stop chat`);
        }
    }
}