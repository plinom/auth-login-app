import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { API_CONFIG } from './common/configs/api.config';
import { WEB_CONFIG } from './common/configs/web.config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<INestApplication>(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const webHost = config.get<string>(`${WEB_CONFIG}.webHost`);
  const webPort = config.get<string>(`${WEB_CONFIG}.webPort`);
  const apiHost = config.get<string>(`${API_CONFIG}.apiHost`);
  const apiPort = config.get<string>(`${API_CONFIG}.apiPort`);

  const webPortNumber = webPort ? parseInt(webPort, 10) : 3000;
  const apiPortNumber = apiPort ? parseInt(apiPort, 10) : 3000;

  app.enableCors({
    allowedHeaders: ['my-custom-header'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: [`http://${webHost}:${webPortNumber}`],
  });

  await app.listen(apiPortNumber);
  logger.log(`🚀 Application is running on: http://${apiHost}:${apiPort}/`);
}
bootstrap();
