import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  firstName: String,
  id: String,
  lastName: String,
  password: String,
});

export interface User extends Document {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
}
