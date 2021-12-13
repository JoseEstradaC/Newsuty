import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewsPage } from './add-news.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewsPageRoutingModule {}
