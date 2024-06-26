import { Injectable, Logger } from "@nestjs/common";
import { User } from "../user";
import { UserRepository } from "../user.repository";
import { UserMessageInterface } from "@shared/user";

const CHAT_INTERVAL_TIME_MILLISECONDS = 3000;

@Injectable()
export class UserChatService {
    private readonly logger = new Logger(UserChatService.name);
    private intervalTimeout: NodeJS.Timeout | undefined;
    constructor(
        private readonly userRepository: UserRepository,
    ) {}
    generateRandomMessage(users: User[]): UserMessageInterface {
        const user = users[Math.floor(Math.random() * users.length)];
        return {
            username: user.username,
            message: user.talk()
        }
    }
    async startChat(callback: (data: UserMessageInterface) => void) {
        if (this.intervalTimeout) {
            return;
        }
        const users = await this.userRepository.getAll();
        this.intervalTimeout = setInterval(() => {
            callback(this.generateRandomMessage(users));
        }, CHAT_INTERVAL_TIME_MILLISECONDS);
        this.logger.log('Chat started');
    }
    stopChat() {
        if (this.intervalTimeout) {
            clearInterval(this.intervalTimeout);
            this.intervalTimeout = undefined;
            this.logger.log('Chat stopped');
        }
    }
}