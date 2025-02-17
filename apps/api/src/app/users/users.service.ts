import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model, Types } from 'mongoose';
import { User } from 'src/app/users/schema/user.schema';

import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel('User') private usersModel: Model<User>) {}

  async findByClientId(clientId: string): Promise<UserResponseDto> {
    try {
      const user = await this.usersModel.findOne({
        clientId: clientId,
      });

      return UserResponseDto.fromEntity(user);
    } catch (error) {
      this.logger.error(`Error finding user by clientId: ${error}`);
      throw new NotFoundException(`Error finding user by clientId: ${error}`);
    }
  }

  async findByFirebaseId(firebaseId: string): Promise<UserResponseDto> {
    try {
      const user = await this.usersModel.findOne({
        firebaseId: firebaseId,
      });

      return UserResponseDto.fromEntity(user);
    } catch (error) {
      this.logger.error(
        `User with firebaseId ${firebaseId} not found: ${error}`,
      );
      throw new NotFoundException(
        `User with firebaseId ${firebaseId} not found: ${error}`,
      );
    }
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<UserResponseDto> {
    try {
      const hashedPassword = await hash(signUpUserDto.password, 10);
      const user = new this.usersModel({
        ...signUpUserDto,
        password: hashedPassword,
      });

      const savedUser = await user.save();

      return UserResponseDto.fromEntity(savedUser);
    } catch (error) {
      this.logger.error(`Error signing up user: ${error}`);
      throw new BadRequestException(`Error signing up user: ${error}`);
    }
  }

  async updateClientId(
    firebaseId: string,
    clientId: string,
  ): Promise<UserResponseDto> {
    try {
      const updatedUser = await this.usersModel.findOneAndUpdate(
        {
          firebaseId: firebaseId,
        },
        {
          clientId: clientId,
        },
      );

      return UserResponseDto.fromEntity(updatedUser);
    } catch (error) {
      this.logger.error(`Error updating clientId: ${error}`);
      throw new BadRequestException(`Error updating clientId: ${error}`);
    }
  }

  async updateJoinedRooms(
    firebaseId: string,
    roomId: Types.ObjectId,
  ): Promise<UserResponseDto> {
    try {
      const updatedUser = await this.usersModel.findOneAndUpdate(
        { firebaseId: firebaseId },
        {
          $push: { rooms: roomId },
        },
      );

      return UserResponseDto.fromEntity(updatedUser);
    } catch (error) {
      this.logger.error(`Error updating joined rooms: ${error}`);
      throw new BadRequestException(`Error updating joined rooms: ${error}`);
    }
  }

  async updateMessages(
    firebaseId: string,
    messageId: Types.ObjectId,
  ): Promise<UserResponseDto> {
    try {
      const updatedUser = await this.usersModel.findOneAndUpdate(
        {
          firebaseId: firebaseId,
        },
        {
          $push: { messages: messageId },
        },
      );

      return UserResponseDto.fromEntity(updatedUser);
    } catch (error) {
      this.logger.error(`Error updating messages: ${error}`);
      throw new BadRequestException(`Error updating messages: ${error}`);
    }
  }
}
