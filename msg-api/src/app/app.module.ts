import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseAdminModule } from 'src/app/firebase-admin/firebase-admin.module';

import apiConfig from '../common/configs/api.config';
import firebaseAdminConfig from '../common/configs/firebase-admin.config';
import mongoDbConfig, { MONGO_CONFIG } from '../common/configs/mongo-db.config';
import webConfig from '../common/configs/web.config';
import { MessageModule } from './messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';

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
