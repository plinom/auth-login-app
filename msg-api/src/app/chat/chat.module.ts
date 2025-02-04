import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/common/schemas/chat.schema';

import { ChatGateway } from './chat.gateway';

@Module({
  exports: [ChatGateway],
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  providers: [ChatGateway],
})
export class ChatModule {}
