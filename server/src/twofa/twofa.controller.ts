import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { TwoFactorAuthenticationCodeDTO } from './dto/two.factor.authentication.code.dto';
import { JwtTemporaryGuard } from './guards/jwt.temporary.guard';
import { TwofaService } from './twofa.service';

@ApiTags('twofa')
@Controller('twofa')
export class TwofaController {
  constructor(private readonly twofaService: TwofaService) {}

  @Post('generate-qr')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtTemporaryGuard)
  async generateQr(
    @Res() res: Response,
    @Req() req: Request & { user: PayloadDTO },
  ) {
    const otpauthUrl =
      await this.twofaService.generateTwoFactorAuthenticationSecret(req.user);
    res.setHeader('COntent-Type', 'image/png');
    return await this.twofaService.pipeQrCode(res, otpauthUrl);
  }

  @Post('turn-on')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtTemporaryGuard)
  async turnOnTwoFactorAuthentication(
    @Req() req: Request & { user: PayloadDTO },
    @Body() twoFactorAuthenticationCodeDTO: TwoFactorAuthenticationCodeDTO,
    @Res() res: Response,
  ) {
    try {
      await this.twofaService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCodeDTO.code,
        req.user,
      );
      const { accessToken } = await this.twofaService.generateAccessToken(
        req.user.email,
      );
      return res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .clearCookie('temporaryToken', {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'lax',
        })
        .send(true);
    } catch (err) {
      return res
        .status(err.status)
        .json({ status: err.status, message: err.response });
    }
  }
}
