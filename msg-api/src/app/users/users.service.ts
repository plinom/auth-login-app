import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/app/users/schema/user.schema';

import { SignUpUserDto } from './dto/sign-up-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usersModel: Model<User>) {}

  async findByClientId(clientId: string): Promise<User> {
    const user = await this.usersModel.findOne({
      clientId: clientId,
    });

    return user;
  }

  async findByFirebaseId(firebaseId: string): Promise<User> {
    const user = await this.usersModel.findOne({
      firebaseId: firebaseId,
    });

    return user;
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    const user = new this.usersModel(signUpUserDto);

    return user.save();
  }

  async updateClientId(firebaseId: string, clientId: string): Promise<void> {
    await this.usersModel.findOneAndUpdate(
      {
        firebaseId: firebaseId,
      },
      {
        clientId: clientId,
      },
    );
  }

  async updateJoinedRooms(
    firebaseId: string,
    roomId: Types.ObjectId,
  ): Promise<void> {
    await this.usersModel.findOneAndUpdate(
      { firebaseId: firebaseId },
      {
        $push: { rooms: roomId },
      },
    );
  }

  async updateMessages(
    firebaseId: string,
    messageId: Types.ObjectId,
  ): Promise<void> {
    await this.usersModel.findOneAndUpdate(
      {
        firebaseId: firebaseId,
      },
      {
        $push: { messages: messageId },
      },
    );
  }
}
