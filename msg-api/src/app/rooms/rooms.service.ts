import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UsersService } from '../users/users.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    private readonly usersService: UsersService,
  ) {}

  async addNewMessage(
    roomId: Types.ObjectId,
    messageId: Types.ObjectId,
  ): Promise<Room> {
    return await this.roomModel.findByIdAndUpdate(
      {
        _id: roomId,
      },
      {
        $push: { messages: messageId },
      },
    );
  }

  async createRoom(
    firebaseId: string,
    createRoomDto: CreateRoomDto,
  ): Promise<void> {
    const { name } = createRoomDto;
    const room = await this.roomModel.create({
      connectedUsersIds: [firebaseId],
      createdBy: firebaseId,
      name,
    });

    await room.save();

    await this.usersService.updateJoinedRooms(firebaseId, room._id);
  }

  async findById(roomId: string): Promise<Room> {
    return await this.roomModel.findById(roomId);
  }

  async getAll(): Promise<Room[]> {
    return await this.roomModel.find().exec();
  }

  async getAllBySearchParam(search: string): Promise<Room[]> {
    return await this.roomModel.find({
      name: { $regex: new RegExp(`.*${search}.*`) },
    });
  }
}
