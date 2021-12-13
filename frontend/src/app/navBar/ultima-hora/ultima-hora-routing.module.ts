import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimaHoraPage } from './ultima-hora.page';

const routes: Routes = [
  {
    path: '',
    component: UltimaHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimaHoraPageRoutingModule {}
