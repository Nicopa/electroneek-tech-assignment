import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserChatService } from '@user';
import { UserMessageInterface, UserWsSocketMessageName } from '@shared/user';

@WebSocketGateway({ namespace: 'app-ui', cors: { origin: 'http://localhost:4200' } })
// @WebSocketGateway({ namespace: 'app-ui' })
export class ApiGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private readonly logger = new Logger(ApiGateway.name);
    private chatTimeout: NodeJS.Timeout | undefined;
    constructor(
        private readonly userChatService: UserChatService,
    ) {}

    handleConnection(socket: Socket) {
        this.logger.log(`Client connected: ${socket.id}`);
    }

    handleDisconnect() {
        this.logger.log('Client disconnected');
    }

    sendChatMessage(data: UserMessageInterface) {
        this.server.emit(UserWsSocketMessageName.ChatMessage, data);
    }

    @SubscribeMessage(UserWsSocketMessageName.StartChat)
    async handleEvent() {
        this.logger.log('Chat start request received');
        if (this.chatTimeout) return 'Chat already started';
        await this.userChatService.startChat(
            (data) => this.sendChatMessage(data),
        );
        return 'Started';
    }

    @SubscribeMessage(UserWsSocketMessageName.StopChat)
    handleStopChat() {
        this.logger.log('Chat stop request received');
        this.userChatService.stopChat();
        return 'Stopped';
    }
}