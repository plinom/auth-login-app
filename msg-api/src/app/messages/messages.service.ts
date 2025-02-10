import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model, ObjectId } from 'mongoose';

import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
  ) {}

  async createMessage(
    created: Date,
    ownerId: string,
    roomId: ObjectId,
    text: string,
  ): Promise<Message> {
    const message = await this.messagesModel.create({
      created: create,
      ownerId: ownerId,
      roomId: roomId,
      text: text,
    });

    await message.save();

    return message;
  }
}
