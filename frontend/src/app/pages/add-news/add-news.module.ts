import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewsPageRoutingModule } from './add-news-routing.module';

import { AddNewsPage } from './add-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewsPageRoutingModule
  ],
  declarations: [AddNewsPage]
})
export class AddNewsPageModule {}
