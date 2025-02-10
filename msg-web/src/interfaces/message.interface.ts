import { IRoom } from './room.interface';
import { IUser } from './user.interface';

export interface IMessage {
  _id?: string;
  owner?: IUser | string;
  room?: IRoom | string;
  text?: string;
}
