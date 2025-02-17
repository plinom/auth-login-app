import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
  ) {}

  async createMessage(
    ownerId: string,
    roomId: Types.ObjectId,
    text: string,
  ): Promise<Message> {
    const message = await this.messagesModel.create({
      ownerId: ownerId,
      roomId: roomId,
      text: text,
    });

    await message.save();

    return message;
  }

  async getAllByRoomId(roomId: Types.ObjectId): Promise<Message[]> {
    return this.messagesModel.find({ roomId }).exec();
  }
}
