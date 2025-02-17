export interface IRoom {
  _id?: string;
  connectedUsersIds: string[];
  createdBy: string;
  messages: string[];
  name: string;
}
