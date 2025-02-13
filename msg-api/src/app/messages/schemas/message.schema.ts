import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  _id: Types.ObjectId;

  @Prop({ ref: 'User', required: true, type: Types.ObjectId })
  ownerId: Types.ObjectId;

  @Prop({ ref: 'Room', required: true, type: Types.ObjectId })
  roomId: Types.ObjectId;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
