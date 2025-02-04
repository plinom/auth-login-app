import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/schemas/user.schema';

import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    description: 'Create new user',
    type: SignUpUserDto,
  })
  @ApiOperation({ summary: 'Create new user' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signupUser(@Body() signUpUserDto: SignUpUserDto): Promise<User> {
    return await this.usersService.signUp(signUpUserDto);
  }

  @Get('protected-route')
  @UseGuards(AuthGuard)
  async testProtectedRoute() {}
}
