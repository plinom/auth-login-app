import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateMessageDto {
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
}
