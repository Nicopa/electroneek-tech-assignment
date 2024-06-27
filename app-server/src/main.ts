import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { logger });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('User Chat Simulation REST API')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`)
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`/`, app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      tryItOutEnabled: true
    }
  });
  logger.log(`Application listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
