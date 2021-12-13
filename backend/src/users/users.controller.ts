import {
  Controller,
  Get,
  Request,
  UseGuards,
  Param,
  Patch,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(@Request() req: any) {
    return await this.usersService.getAllUsers(req.user.claim);
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  async getAllUser(@Request() req: any) {
    return await this.usersService.getAllUser(req.user.claim);
  }

  @Get('admins')
  @UseGuards(AuthGuard('jwt'))
  async getAllAdmins(@Request() req: any) {
    return await this.usersService.getAllAdmin(req.user.claim);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getuser(@Request() req: any, @Param('id') id: string) {
    return await this.usersService.findUserById(
      id,
      req.user.claim,
      req.user.sub,
    );
  }

  @Patch('usertoadmin')
  @UseGuards(AuthGuard('jwt'))
  async userToAdmin(
    @Request() req: any,
    @Body()
    data: {
      email: string;
    },
  ) {
    return await this.usersService.updateToAdmin(req.user.claim, data.email);
  }
  @Patch('admintouser')
  @UseGuards(AuthGuard('jwt'))
  async adminToUser(
    @Request() req: any,
    @Body()
    data: {
      email: string;
    },
  ) {
    return await this.usersService.updateToUser(req.user.claim, data.email);
  }
}
