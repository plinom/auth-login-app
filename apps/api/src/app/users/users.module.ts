import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { User, UserSchema } from '../users/schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FirebaseAdminModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
