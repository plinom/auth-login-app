import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { Room } from '../schemas/room.schema';

export class RoomResponseDto {
  @ApiProperty({
    description: 'Room ID',
    example: '1234567890',
  })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'Connected users IDs',
    example: ['1234567890', '1234567891'],
  })
  connectedUsersIds: string[];

  @ApiProperty({
    description: 'Created by',
    example: '1234567890',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Messages',
    example: ['1234567890', '1234567891'],
  })
  messages: Types.ObjectId[];

  @ApiProperty({
    description: 'Room name',
    example: 'Room 1',
  })
  name: string;

  static fromEntity(room: Room): RoomResponseDto {
    const dto = new RoomResponseDto();
    dto._id = room._id;
    dto.connectedUsersIds = room.connectedUsersIds;
    dto.createdBy = room.createdBy;
    dto.messages = room.messages;
    dto.name = room.name;
    return dto;
  }
}
