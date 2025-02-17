import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { User } from '../schema/user.schema';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '1234567890',
  })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'Client ID',
    example: '1234567890',
  })
  clientId: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    description: 'User firebaseId',
    example: '1234567890',
  })
  firebaseId: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Messages',
    example: ['1234567890', '1234567891'],
  })
  messages: Types.ObjectId[];

  @ApiProperty({
    description: 'Rooms',
    example: ['1234567890', '1234567891'],
  })
  rooms: Types.ObjectId[];

  @ApiProperty({
    description: 'User username',
    example: 'john_doe',
  })
  username: string;

  static async fromEntity(user: User): Promise<UserResponseDto> {
    const dto = new UserResponseDto();
    dto._id = user._id;
    dto.clientId = user.clientId;
    dto.email = user.email;
    dto.firebaseId = user.firebaseId;
    dto.fullName = user.fullName;
    dto.messages = user.messages;
    dto.rooms = user.rooms;
    dto.username = user.username;
    return dto;
  }
}
