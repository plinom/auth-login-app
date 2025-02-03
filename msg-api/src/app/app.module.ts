import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import apiConfig from '../common/configs/api.config';
import webConfig from '../common/configs/web.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [webConfig, apiConfig],
    }),
  ],
})
export class AppModule {}
