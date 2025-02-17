import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UsersService } from '../users/users.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    private readonly usersService: UsersService,
  ) {}

  async addNewMessage(
    roomId: Types.ObjectId,
    messageId: Types.ObjectId,
  ): Promise<RoomResponseDto> {
    try {
      const updatedRoom = await this.roomModel.findByIdAndUpdate(
        {
          _id: roomId,
        },
        {
          $push: { messages: messageId },
        },
      );

      return RoomResponseDto.fromEntity(updatedRoom);
    } catch (error) {
      this.logger.error(`Error adding new message: ${error}`);
      throw new BadRequestException(`Error adding new message: ${error}`);
    }
  }

  async createRoom(
    firebaseId: string,
    createRoomDto: CreateRoomDto,
  ): Promise<RoomResponseDto> {
    try {
      const { name } = createRoomDto;
      const room = await this.roomModel.create({
        connectedUsersIds: [firebaseId],
        createdBy: firebaseId,
        name,
      });

      const savedRoom = await room.save();

      await this.usersService.updateJoinedRooms(firebaseId, room._id);

      return RoomResponseDto.fromEntity(savedRoom);
    } catch (error) {
      this.logger.error(`Error creating room: ${error}`);
      throw new BadRequestException(`Error creating room: ${error}`);
    }
  }

  async findById(roomId: string): Promise<RoomResponseDto> {
    try {
      const room = await this.roomModel.findById(roomId);

      return RoomResponseDto.fromEntity(room);
    } catch (error) {
      this.logger.error(`Error finding room by id: ${error}`);
      throw new BadRequestException(`Error finding room by id: ${error}`);
    }
  }

  async getAll(): Promise<RoomResponseDto[]> {
    try {
      const rooms = await this.roomModel.find().exec();
      return rooms.map((room) => RoomResponseDto.fromEntity(room));
    } catch (error) {
      this.logger.error(`Error getting all rooms: ${error}`);
      throw new BadRequestException(`Error getting all rooms: ${error}`);
    }
  }

  async getAllBySearchParam(search: string): Promise<RoomResponseDto[]> {
    try {
      const rooms = await this.roomModel.find({
        name: { $regex: new RegExp(`.*${search}.*`) },
      });

      return rooms.map((room) => RoomResponseDto.fromEntity(room));
    } catch (error) {
      this.logger.error(`Error getting all rooms by search param: ${error}`);
      throw new BadRequestException(
        `Error getting all rooms by search param: ${error}`,
      );
    }
  }
}
