import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseAdminService } from 'src/app/firebase-admin/firebase-admin.service';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    return this.validateToken(token, context);
  }

  async validateToken(
    token: string,
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const firebaseUser = await this.firebaseAdminService.verifyToken(token);

      const user = await this.usersService.findUserById(firebaseUser.uid);

      if (!user)
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

      request.user = user;

      return true;
    } catch (err) {
      this.logger.error(`Something went wrong ${err}`);
      return false;
    }
  }
}
