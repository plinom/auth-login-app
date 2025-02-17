import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: [`http://${webHost}:${webPortNumber}`],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MSG api')
    .setDescription('MSG api description')
    .setVersion('0.0.1')
    .addServer(
      `http://${config.get<string>(`${API_CONFIG}.apiHost`)}:${config.get<string>(
        `${API_CONFIG}.apiPort`,
      )}/`,
      'Local environment',
    )
    .addBearerAuth({
      bearerFormat: 'JWT',
      description: 'Enter your Bearer token',
      in: 'header',
      name: 'Authorization',
      scheme: 'bearer',
      type: 'http',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'MSG api',
  });

  await app.listen(apiPortNumber);
  logger.log(`🚀 Application is running on: http://${apiHost}:${apiPort}/`);
}
bootstrap();
