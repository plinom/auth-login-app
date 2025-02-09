import { Document, Schema } from 'mongoose';

export const ChatSchema = new Schema({
  message: { required: true, type: String },
  room: { ref: 'Room', type: Schema.Types.ObjectId },
  sender: { ref: 'User', required: true, type: Schema.Types.ObjectId },
  timestamp: { default: Date.now, type: Date },
});

export interface Chat extends Document {
  message: string;
  room: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  timestamp: Date;
}
