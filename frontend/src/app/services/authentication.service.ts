import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  async isLogin() {
    try {
      await this.httpClient.get('http://localhost:3000/auth/local/issignin', { withCredentials: true }).toPromise();
      return true;
    } catch (error) {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  async singout() {
    try {
      const asd = await this.httpClient
        .post('http://localhost:3000/auth/local/signout', {}, { withCredentials: true })
        .toPromise();

      this.router.navigate(['/login'], { replaceUrl: true });
      localStorage.setItem('userID', null);
      localStorage.setItem('isAdmin', null);
      return true;
    } catch (error) {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const userID: any = await this.httpClient
        .post('http://localhost:3000/auth/local/signin', loginDto, { withCredentials: true })
        .toPromise();

      const admin: any = await this.httpClient
        .get('http://localhost:3000/auth/local/isadmin', { withCredentials: true })
        .toPromise();

      localStorage.setItem('userID', userID.id);
      localStorage.setItem('isAdmin', admin.isAdmin);

      return true;
    } catch (error) {
      return false;
    }
  }

  async register(loginDto: LoginDto) {
    try {
      await this.httpClient
        .post('http://localhost:3000/auth/local/signup', loginDto, { withCredentials: true })
        .toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }
}
