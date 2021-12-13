import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NewsService } from 'src/app/services/news.service';
import { IonContent, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { NewsDto, NewsPag } from 'src/app/dto';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  @Input() categoria: string;
  pag = 0;
  data: NewsDto[] = [];
  scroll = 0;
  userID = localStorage.getItem('userID');
  isAdmin: boolean = JSON.parse(localStorage.getItem('isAdmin'));

  constructor(private newsService: NewsService, private iab: InAppBrowser, private alertController: AlertController) {}

  async ngOnInit() {
    await this.loadData();
  }

  logScrolling(event) {
    this.scroll = event.detail.scrollTop;
  }

  converTime(date: string) {
    return moment(date).locale('es').fromNow();
  }

  async loadData(event?) {
    let newsPag: NewsPag;
    switch (this.categoria) {
      case 'ultimaHora':
        newsPag = await this.newsService.getNewNewsPag(this.pag);
        break;
      case 'destacados':
        newsPag = await this.newsService.getNewsPag(this.pag);
        break;
      case 'misNoticias':
        newsPag = await this.newsService.getUserNewsPag(this.pag);
        break;
    }

    this.data.push(...newsPag.news);
    this.pag++;

    if (!event) {
      return;
    }

    event.target.complete();
    if (newsPag.fin) {
      event.target.disabled = true;
    }
  }

  async doRefresh(event) {
    this.pag = 0;
    this.data = [];
    this.infinityScroll.disabled = false;
    await this.loadData();
    event.target.complete();
  }

  getColorBoton(vote: number, type: boolean) {
    // console.log('vote:' + vote + 'type:' + type);
    if (type && vote === 1) {
      return 'success';
    }

    if (!type && vote === 2) {
      return 'danger';
    }

    if (vote !== 0) {
      return 'light';
    }
    return '';
  }

  async gestionVotar(news: NewsDto, type: boolean) {
    if (news.vote === 0) {
      const newNews = await this.newsService.voteNews(news.id, type);

      if (newNews) {
        const scroll = this.scroll;
        this.pag = 0;
        this.data = [];
        this.infinityScroll.disabled = false;
        await this.loadData();
        // setTimeout(() => {
        //   this.content.scrollToPoint(0, scroll);
        // }, 0.1);
      }
    }

    if ((news.vote === 1 && type) || (news.vote === 2 && !type)) {
      const newNews = await this.newsService.deleteVoteNews(news.id);

      if (newNews) {
        const scroll = this.scroll;
        this.pag = 0;
        this.data = [];
        this.infinityScroll.disabled = false;
        await this.loadData();
        // setTimeout(() => {
        //   this.content.scrollToPoint(0, scroll);
        // }, 0.1);
      }
    }
  }

  openWeb(url: string) {
    const browser = this.iab.create(url, '_blank');
  }

  async handleBorrar(news: NewsDto) {
    console.log(this.userID === news.userID);
    console.log(this.userID);
    console.log(news.userID);
    console.log(!!this.isAdmin);

    await this.newsService.deleteNews(news.id);
    const index = this.data.findIndex((newsFind) => newsFind.id === news.id);
    this.data.splice(index, 1);
  }
}
