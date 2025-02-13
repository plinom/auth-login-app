import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ default: '', type: String })
  clientId: string;

  @Prop({
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
    type: String,
    unique: true,
  })
  email: string;

  @Prop({ required: true, type: String })
  firebaseId: string;

  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ default: [], type: [{ ref: 'Message', type: Types.ObjectId }] })
  messages: Types.ObjectId[];

  @Prop({ minlength: 8, required: true, type: String })
  password: string;

  @Prop({ default: [], type: [{ ref: 'Room', type: Types.ObjectId }] })
  rooms: Types.ObjectId[];

  @Prop({ required: true, type: String, unique: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
