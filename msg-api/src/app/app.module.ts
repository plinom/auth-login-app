import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoDbConfig, {
  MONGO_CONFIG,
} from 'src/common/configs/mongo-db.config';

import apiConfig from '../common/configs/api.config';
import webConfig from '../common/configs/web.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [webConfig, apiConfig, mongoDbConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(`${MONGO_CONFIG}.uri`),
      }),
    }),
  ],
})
export class AppModule {}
