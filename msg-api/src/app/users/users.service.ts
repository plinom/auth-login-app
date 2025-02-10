import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { User } from 'src/app/users/schema/user.schema';

import { SignUpUserDto } from './dto/sign-up-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usersModel: Model<User>) {}

  async findUserByClientId(id: string): Promise<User> {
    const user = await this.usersModel.findOne({
      clientId: id,
    });

    return user;
  }

  async findUserByFirebaseid(id: string): Promise<User> {
    const user = await this.usersModel.findOne({
      id: id,
    });

    return user;
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    const user = new this.usersModel(signUpUserDto);

    return user.save();
  }

  async updateClientId(id: Schema.Types.ObjectId, user: User): Promise<void> {
    await this.usersModel.findByIdAndUpdate(
      {
        _id: id,
      },
      user,
    );
  }

  async updateJoinedRooms(userId: string, roomId: ObjectId): Promise<void> {
    await this.usersModel.findOneAndUpdate(
      { id: userId },
      {
        $push: { rooms: roomId },
      },
    );
  }
}
