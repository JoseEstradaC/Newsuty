import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  test() {
    // console.log('ads');
  }

  async salir() {
    await this.auth.singout();
  }

  goToNewNews() {
    // this.router.navigateByUrl('/add-news');
    this.router.navigateByUrl('/add-news', { replaceUrl: true });
  }
}
