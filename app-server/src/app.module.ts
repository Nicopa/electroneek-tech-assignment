import { Module } from '@nestjs/common';
import { UserModule } from '@user';
import { WebsocketModule } from './gateway/websocket.module';

@Module({
  imports: [UserModule, WebsocketModule],
})
export class AppModule {}
