import { User } from 'firebase/auth';

export interface IRoom {
  _id?: string;
  connectedUsers?: User[];
  messages?: string;
  name?: string;
}
