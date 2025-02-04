import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/schemas/user.schema';

import { SignUpUserDto } from './dto/sign-up-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usersModel: Model<User>) {}

  async findUserById(id: string): Promise<User> {
    const user = await this.usersModel.findOne({
      id: id,
    });

    return user;
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    const user = new this.usersModel(signUpUserDto);

    return user.save();
  }
}
