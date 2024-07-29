import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ValidationCode } from 'src/entities/validation.code.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, ValidationCode]), MailModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
