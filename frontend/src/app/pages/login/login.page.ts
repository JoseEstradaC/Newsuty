import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginDto } from 'src/app/dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthenticationService, public alertController: AlertController, private router: Router) {}

  async ngOnInit() {}

  async login() {
    const user: LoginDto = {
      email: this.email,
      password: this.password,
    };

    try {
      const login = await this.auth.login(user);
      if (!login) {
        throw new Error('');
      }

      const alert = await this.alertController.create({
        header: 'Login',
        subHeader: 'Datos correctos',
        buttons: ['OK'],
      });

      await alert.present();

      await alert.onDidDismiss();

      this.router.navigateByUrl('/home');
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Login',
        subHeader: 'Datos erroneos',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  async register() {
    const user: LoginDto = {
      email: this.email,
      password: this.password,
    };

    try {
      const register = await this.auth.register(user);
      if (!register) {
        throw new Error('');
      }

      const login = await this.auth.login(user);
      if (!login) {
        throw new Error('');
      }

      const alert = await this.alertController.create({
        header: 'Registro',
        subHeader: 'Registro correcto',
        buttons: ['OK'],
      });

      await alert.present();

      await alert.onDidDismiss();

      this.router.navigateByUrl('/home');
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Registro',
        subHeader: 'Registro fallido',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
