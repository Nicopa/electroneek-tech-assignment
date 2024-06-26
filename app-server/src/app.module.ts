import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@user';
import { WebsocketModule } from './gateway/websocket.module';

@Module({
  imports: [UserModule, WebsocketModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
