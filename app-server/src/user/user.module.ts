import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserNotFoundInterceptor } from "./interceptor/user-not-found.interceptor";
import { UserChatService } from "./chat/user-chat.service";

@Module({
    controllers: [UserController],
    providers: [UserRepository, UserService, UserChatService, {
        provide: APP_INTERCEPTOR,
        useClass: UserNotFoundInterceptor
    }],
    exports: [UserService, UserChatService]
})
export class UserModule {}