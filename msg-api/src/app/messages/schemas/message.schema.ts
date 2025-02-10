import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema()
export class Message {
  _id: ObjectId;

  @Prop({ required: true })
  created: Date;

  @Prop({ ref: 'User', required: true, type: String })
  ownerId: string;

  @Prop({ ref: 'Room', required: true, type: Types.ObjectId })
  roomId: ObjectId;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
