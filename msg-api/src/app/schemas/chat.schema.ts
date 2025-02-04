import { Document, Schema } from 'mongoose';

export const ChatSchema = new Schema({
  message: String,
  room: String,
  sender: String,
  timestamp: { default: Date.now, type: Date },
});

export interface Chat extends Document {
  message: string;
  room: string;
  sender: string;
  timestamp: Date;
}
