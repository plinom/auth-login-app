import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { Message } from '../schemas/message.schema';

export class MessageResponseDto {
  @ApiProperty({
    description: 'Message ID',
    example: '1234567890',
  })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello, how are you?',
  })
  content: string;

  @ApiProperty({
    description: 'Owner ID',
    example: '1234567890',
  })
  ownerId: Types.ObjectId;

  @ApiProperty({
    description: 'Room ID',
    example: '1234567890',
  })
  roomId: Types.ObjectId;

  static fromEntity(message: Message): MessageResponseDto {
    const dto = new MessageResponseDto();
    dto._id = message._id;
    dto.content = message.content;
    dto.ownerId = message.ownerId;
    dto.roomId = message.roomId;
    return dto;
  }
}
