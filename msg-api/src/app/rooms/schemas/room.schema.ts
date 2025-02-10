import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

import { Message } from '../../messages/schemas/message.schema';
import { User } from '../../users/schema/user.schema';

@Schema()
export class Room {
  _id: ObjectId;

  @Prop({ type: [{ ref: 'User', type: Types.ObjectId }] })
  connectedUsers: User[];

  @Prop({ ref: 'User', required: true, type: String })
  createdBy: string;

  @Prop({ type: [{ ref: 'Message', type: Types.ObjectId }] })
  messages: Message[];

  @Prop({ maxlength: 20, minlength: 5, required: true })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
