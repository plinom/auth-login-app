import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseAdminModule } from 'src/app/firebase-admin/firebase-admin.module';

import { MessageModule } from './app/messages/messages.module';
import { RoomsModule } from './app/rooms/rooms.module';
import { UsersModule } from './app/users/users.module';
import apiConfig from './common/configs/api.config';
import firebaseAdminConfig from './common/configs/firebase-admin.config';
import mongoDbConfig from './common/configs/mongo-db.config';
import { MONGO_CONFIG } from './common/configs/mongo-db.config';
import webConfig from './common/configs/web.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [webConfig, apiConfig, mongoDbConfig, firebaseAdminConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(`${MONGO_CONFIG}.uri`),
      }),
    }),
    UsersModule,
    FirebaseAdminModule,
    RoomsModule,
    MessageModule,
  ],
})
export class AppModule {}
