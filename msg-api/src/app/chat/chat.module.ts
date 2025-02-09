import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/common/schemas/chat.schema';
import { RoomSchema } from 'src/common/schemas/room.schema';
import { UserSchema } from 'src/common/schemas/user.schema';

import { ChatGateway } from './chat.gateway';

@Module({
  exports: [ChatGateway],
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'Room', schema: RoomSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
