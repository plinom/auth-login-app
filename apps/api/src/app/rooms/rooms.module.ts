import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  controllers: [RoomsController],
  exports: [RoomsService],
  imports: [
    UsersModule,
    FirebaseAdminModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomsService],
})
export class RoomsModule {}
