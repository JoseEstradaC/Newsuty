import {
  Post,
  Controller,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthDto } from '../dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/users/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signin')
  async signinLocal(
    @Body() localAuthDto: LocalAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const [token, userId] = await this.authService.signinLocal(localAuthDto);

    res.cookie('auth-cookie', token, { httpOnly: true });
    return { id: userId };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('local/issignin')
  async IsSigninLocal(@Req() req: any) {
    return { isSingIn: true };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('local/isadmin')
  async isAdmin(@Req() req: any) {
    if (req.user.claim === Roles.admin) {
      return { isAdmin: true };
    }
    return { isAdmin: false };
  }

  @Post('local/signup')
  signupLocal(@Body() localAuthDto: LocalAuthDto) {
    return this.authService.signupLocal(localAuthDto);
  }

  @Post('local/signout')
  async singout(@Res({ passthrough: true }) res: Response) {
    res.cookie('auth-cookie', 'out', {
      httpOnly: true,
    });
    return { msg: 'success' };
  }
}
