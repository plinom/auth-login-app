import { AvatarInterface } from '@msg-monorepo/dto';
import { IsNumber, IsString } from 'class-validator';
/**
 *
 *
 * @export
 * @class AvatarDto
 * @implements {AvatarInterface}
 */
export class AvatarDto implements AvatarInterface {
  @IsString()
  fieldname: string;

  @IsString()
  originalname: string;

  @IsString()
  encoding: string;

  @IsString()
  mimetype: string;

  buffer: Buffer;

  @IsNumber()
  size: number;
}
