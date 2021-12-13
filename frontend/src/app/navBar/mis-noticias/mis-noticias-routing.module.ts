import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisNoticiasPage } from './mis-noticias.page';

const routes: Routes = [
  {
    path: '',
    component: MisNoticiasPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisNoticiasPageRoutingModule {}
