import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  chatIds: [{ ref: 'Chat', type: Schema.Types.ObjectId }],
  email: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  id: String,
  lastName: { required: true, type: String },
  password: { required: true, type: String },
  roomIds: [{ ref: 'Room', type: Schema.Types.ObjectId }],
});

export interface User extends Document {
  chatIds: Schema.Types.ObjectId[];
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  roomIds: Schema.Types.ObjectId[];
}
