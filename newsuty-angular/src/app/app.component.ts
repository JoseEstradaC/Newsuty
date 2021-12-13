import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from './dto';
import { Roles, UserDto } from './dto/user.dto';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  email: string = '';
  password: string = '';
  sesion = false;

  users: UserDto[] = [];
  admin: UserDto[] = [];

  constructor(
    private auth: AuthenticationService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.sesion = await this.auth.isLogin();
    if (this.sesion) {
      await this.loadData();
    }
  }

  async login() {
    const loginDto: LoginDto = {
      email: this.email,
      password: this.password,
    };
    const login = await this.auth.login(loginDto);

    if (!login) {
      throw new Error('');
    }

    if (JSON.parse(localStorage.getItem('isAdmin') as string)) {
      this.sesion = true;
      await this.loadData();
    } else {
      await this.auth.singout();
    }
  }
  async loadData() {
    this.admin = (await this.usersService.getAdmins()) as UserDto[];
    this.users = (await this.usersService.getUsers()) as UserDto[];
  }

  async moveToAdmin(users: UserDto[]) {
    users.forEach(async (user) => {
      if (user.role === Roles.admin) return;
      user.role = Roles.admin;
      await this.usersService.userToAdmin(user.email);
    });
  }

  async moveToUser(users: UserDto[]) {
    users.forEach(async (user) => {
      if (user.role === Roles.user) return;
      user.role = Roles.user;
      await this.usersService.adminToUser(user.email);
    });
  }
}
