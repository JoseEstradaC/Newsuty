import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  async getAdmins() {
    try {
      return await this.httpClient
        .get<[UserDto]>('http://localhost:3000/user/admins', {
          withCredentials: true,
        })
        .toPromise();
    } catch (error) {
      return false;
    }
  }

  async getUsers() {
    try {
      return await this.httpClient
        .get<[UserDto]>('http://localhost:3000/user/users', {
          withCredentials: true,
        })
        .toPromise();
    } catch (error) {
      return false;
    }
  }

  async userToAdmin(email: string) {
    try {
      await this.httpClient
        .patch(
          'http://localhost:3000/user/usertoadmin',
          { email },
          {
            withCredentials: true,
          }
        )
        .toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }
  async adminToUser(email: string) {
    try {
      await this.httpClient
        .patch(
          'http://localhost:3000/user/admintouser',
          { email },
          {
            withCredentials: true,
          }
        )
        .toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }
}
