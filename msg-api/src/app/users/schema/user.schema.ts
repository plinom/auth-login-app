import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

import { Message } from '../../messages/schemas/message.schema';

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ type: String })
  clientId?: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: String })
  id: string;

  @Prop({ type: [{ ref: 'Message', type: Types.ObjectId }] })
  messages?: Message[];

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ default: [], type: [{ ref: 'Room', type: Types.ObjectId }] })
  rooms: Types.ObjectId[];

  @Prop({ required: true, type: String })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
