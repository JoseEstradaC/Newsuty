import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocalAuthDto } from 'src/dto';
import { Roles, User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(localAuthDto: LocalAuthDto) {
    const existInDB = await this.existEmailInDb(localAuthDto.email);
    if (existInDB) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const primero = await this.userModel.exists({});

    const newUser = new this.userModel(localAuthDto);
    // console.log(primero);

    if (!primero) {
      newUser.role = Roles.admin;
    }
    const result = await newUser.save();
    return result.id as string;
  }

  async getAllUsers(claim: Roles) {
    if (claim === Roles.admin) {
      const result = await this.userModel.find();
      return result.map((user) => user.toJSON());
    } else {
      throw new UnauthorizedException();
    }
  }

  async getAllAdmin(claim: Roles) {
    if (claim === Roles.admin) {
      const result = await this.userModel.find({ role: Roles.admin });
      return result.map((user) => user.toJSON());
    } else {
      throw new UnauthorizedException();
    }
  }

  async getAllUser(claim: Roles) {
    if (claim === Roles.admin) {
      const result = await this.userModel.find({ role: Roles.user });
      return result.map((user) => user.toJSON());
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateToAdmin(claim: Roles, email: string) {
    if (claim === Roles.admin) {
      const result = await this.userModel.findOne({ email });
      await result.update({ role: Roles.admin }).exec();
      // console.log(result);
      return { update: true };
    } else {
      throw new UnauthorizedException();
    }
  }
  async updateToUser(claim: Roles, email: string) {
    if (claim === Roles.admin) {
      const result = await this.userModel.findOne({ email });
      await result.update({ role: Roles.user }).exec();
      return { update: true };
    } else {
      throw new UnauthorizedException();
    }
  }

  async findUserById(id: string, claim: Roles, userRequestID: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.id === userRequestID || claim === Roles.admin) {
      return user.toJSON();
    } else {
      throw new UnauthorizedException();
    }
  }

  async findUserByEmail(email: string) {
    const result = await this.userModel.findOne({ email });
    if (!result) return false;
    return result;
  }

  async existEmailInDb(email: string) {
    const result = await this.userModel.findOne({ email }).exec();
    if (!result) return false;
    return true;
  }
}
