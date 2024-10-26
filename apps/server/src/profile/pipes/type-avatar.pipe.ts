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
 * @class TypeAvatarPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class TypeAvatarPipe implements PipeTransform {
  /**
   *
   *
   * @param {AvatarDto} avatar
   * @return {*}  {string}
   * @memberof TypeAvatarPipe
   */
  transform(avatar: AvatarDto): string {
    if (avatar.mimetype === 'image/png' || avatar.mimetype === 'image/jpeg')
      throw new HttpException(
        'Validation failed (expected file type is png or jpeg)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return avatar.mimetype;
  }
}
