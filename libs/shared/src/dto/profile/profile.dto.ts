export interface AvatarInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface UserProfileInterface {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
