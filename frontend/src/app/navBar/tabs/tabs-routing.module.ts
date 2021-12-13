import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'destacados',
        loadChildren: () => import('../destacados/destacados.module').then((m) => m.DestacadosPageModule),
      },
      {
        path: 'ultima-hora',
        loadChildren: () => import('../ultima-hora/ultima-hora.module').then((m) => m.UltimaHoraPageModule),
      },
      {
        path: 'mis-noticias',
        loadChildren: () => import('../mis-noticias/mis-noticias.module').then((m) => m.MisNoticiasPageModule),
      },
      {
        path: '',
        redirectTo: '/home/destacados',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
