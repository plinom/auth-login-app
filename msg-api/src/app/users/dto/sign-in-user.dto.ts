import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
    name: 'email',
    required: true,
    type: 'string',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '1234qwerty',
    name: 'password',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}
