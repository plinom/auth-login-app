import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AvatarDto } from '../dto/avatar.dto';
/**
 *
 *
 * @export
 * @class MaxSizeAvatarPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class MaxSizeAvatarPipe implements PipeTransform {
  /**
   *
   *
   * @param {AvatarDto} avatar
   * @return {*}  {number}
   * @memberof MaxSizeAvatarPipe
   */
  transform(avatar: AvatarDto): number {
    if (avatar.size > 50000)
      throw new HttpException(
        'Validation failed (expected max size is 50 kb)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return avatar.size;
  }
}
