import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../common/guards/auth.guard';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user by firebaseId' })
  @Get(':firebaseId')
  @HttpCode(HttpStatus.OK)
  async getUserByFirebaseId(
    @Param('firebaseId') firebaseId: string,
  ): Promise<UserResponseDto> {
    return await this.usersService.findByFirebaseId(firebaseId);
  }

  @Post('sign-in')
  @UseGuards(AuthGuard)
  async signInUser(@Body() signUpUserDto: SignUpUserDto) {}

  @ApiBody({
    description: 'Create new user',
    type: SignUpUserDto,
  })
  @ApiOperation({ summary: 'Create new user' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUpUser(
    @Body() signUpUserDto: SignUpUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.signUp(signUpUserDto);
  }
}
