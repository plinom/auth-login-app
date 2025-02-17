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
import { RoomResponseDto } from './dto/room-response.dto';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@Controller('rooms')
@UseGuards(AuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createNewRoom(
    @User() firebaseId: string,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<RoomResponseDto> {
    return await this.roomsService.createRoom(firebaseId, createRoomDto);
  }

  @Get()
  async find(@Query('search') search: string): Promise<RoomResponseDto[]> {
    return await this.roomsService.getAllBySearchParam(search);
  }

  @Get('/:id')
  async findById(@Param('roomId') roomId: string): Promise<RoomResponseDto> {
    return await this.roomsService.findById(roomId);
  }
}
