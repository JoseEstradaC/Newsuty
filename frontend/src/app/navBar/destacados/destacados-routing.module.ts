import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestacadosPage } from './destacados.page';

const routes: Routes = [
  {
    path: '',
    component: DestacadosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestacadosPageRoutingModule {}
