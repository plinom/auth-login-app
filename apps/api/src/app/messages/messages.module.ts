import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomsModule } from '../rooms/rooms.module';
import { UsersModule } from '../users/users.module';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  controllers: [MessagesController],
  imports: [
    RoomsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessageModule {}
