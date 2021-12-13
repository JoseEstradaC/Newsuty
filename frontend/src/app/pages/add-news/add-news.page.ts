import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage implements OnInit {
  url = '';

  constructor(private news: NewsService, public alertController: AlertController, private router: Router) {}

  ngOnInit() {
    this.url = '';
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  async crear() {
    try {
      const login = await this.news.createNews(this.url);
      if (!login) {
        throw new Error('');
      }

      const alert = await this.alertController.create({
        header: 'Creador',
        subHeader: 'Creada con éxito',
        buttons: ['OK'],
      });

      await alert.present();

      await alert.onDidDismiss();

      this.router.navigateByUrl('/home');
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Creador',
        subHeader: 'Error al crear',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
