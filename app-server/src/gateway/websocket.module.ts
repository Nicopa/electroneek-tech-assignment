import { Module } from "@nestjs/common";
import { ApiGateway } from "./api.gateway";
import { UserModule } from "@user";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [ApiGateway],
})
export class WebsocketModule {}