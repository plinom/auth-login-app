import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';

import { Message } from './schemas/message.schema';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  @Get()
  find(@Query('where') where) {
    where = JSON.parse(where || '{}');
    return this.messageModel.find(where).populate('owner').exec();
  }
}
