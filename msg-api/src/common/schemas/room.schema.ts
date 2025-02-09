import { Document, Schema, Types } from 'mongoose';

export const RoomSchema = new Schema({
  chatIds: [{ ref: 'Chat', type: Types.ObjectId }],
  description: { type: String },
  members: [{ ref: 'User', type: Types.ObjectId }],
  name: { required: true, type: String },
});

export interface Room extends Document {
  chatIds: Types.ObjectId[];
  description?: string;
  members: Types.ObjectId[];
  name: string;
}
