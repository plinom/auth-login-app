import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Room {
  _id: Types.ObjectId;

  @Prop({ default: [], type: [{ ref: 'User', type: String }] })
  connectedUsersIds: string[];

  @Prop({ ref: 'User', required: true, type: String })
  createdBy: string;

  @Prop({ default: [], type: [{ ref: 'Message', type: Types.ObjectId }] })
  messages: Types.ObjectId[];

  @Prop({ maxlength: 20, minlength: 5, required: true, type: String })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
