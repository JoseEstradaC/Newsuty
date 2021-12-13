import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { LocalAuthDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signinLocal(localAuthDto: LocalAuthDto) {
    //logica del login
    const user = await this.usersService.findUserByEmail(localAuthDto.email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.validatePassword(localAuthDto.password))
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );

    return [this.signUser(user.id, user.email, user.role), user.id];
  }

  async signupLocal(localAuthDto: LocalAuthDto) {
    //logica del register
    const id = await this.usersService.createUser(localAuthDto);
    return { id };
  }

  signUser(userID: string, email: string, type: Roles) {
    return this.jwtService.sign({
      sub: userID,
      email,
      claim: type,
    });
  }
}
