import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Message } from '../messages/schemas/message.schema';
import { UsersService } from '../users/users.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    private readonly usersService: UsersService,
  ) {}

  async addNewMessage(roomId: ObjectId, message: Message): Promise<Room> {
    return await this.roomModel.findByIdAndUpdate(
      {
        _id: roomId,
      },
      {
        $push: { messages: message },
      },
    );
  }

  async findRoomById(roomId: string): Promise<Room> {
    return await this.roomModel.findById(roomId);
  }

  async getRooms(search: string): Promise<Room[]> {
    if (search) {
      return this.roomModel
        .find({ name: { $regex: new RegExp(`.*${search}.*`) } })
        .exec();
    } else {
      return this.roomModel.find().exec();
    }
  }

  async newRoom(userId: string, createRoomDto: CreateRoomDto): Promise<void> {
    const { name } = createRoomDto;
    const room = await this.roomModel.create({
      createdBy: userId,
      name,
    });

    await room.save();

    await this.usersService.updateJoinedRooms(userId, room._id);
  }
}
