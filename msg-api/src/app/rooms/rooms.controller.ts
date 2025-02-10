import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

import { User } from '../../common/decorators/user.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.schema';

@ApiTags('rooms')
@Controller('rooms')
@UseGuards(AuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createNewRoom(
    @User() userId: string,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<void> {
    return await this.roomsService.newRoom(userId, createRoomDto);
  }

  @Get()
  async find(@Query('search') search: string): Promise<Room[]> {
    return await this.roomsService.getRooms(search);
  }

  @Get('/:id')
  async findById(@Param('roomId') roomId: string): Promise<Room> {
    return await this.roomsService.findRoomById(roomId);
  }
}
